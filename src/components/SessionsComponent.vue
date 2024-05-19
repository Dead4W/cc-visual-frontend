<template>
  <div class="sessions">
    <div class="session-title">
      <span>
        {{ $t("sessions.title") }}
        <span class="create-session" @click="create"> + </span>
      </span>
    </div>
    <div v-if="socketDatas.length > 0" class="sessions-list">
      <div
        class="session-item"
        :class="{
          active:
            socketData.session &&
            socketData.session.id === iSocketData.session.id,
        }"
        v-for="iSocketData in reversedSocketDatas"
        v-bind:key="iSocketData.session.id"
        @click="connect(iSocketData)"
      >
        <div
          class="session-status"
          :class="{
            active:
              socketData.session &&
              socketData.session.id === iSocketData.session.id &&
              socketData.connected_computers.length > 0,
          }"
        ></div>
        <span :title="iSocketData.name
            ? iSocketData.name
            : `#${iSocketData.session.id}`">{{
          iSocketData.name
            ? iSocketData.name
            : `#${iSocketData.session.id}`
        }}</span>
        <EditIcon
            class="edit-icon"
            :title="$t('sessions.edit')"
            :size="16"
            fill-color="black"
            @click="edit(iSocketData.session.id)"
        />
        <ShareIcon
            class="edit-icon"
            :title="$t('sessions.share')"
            :size="16"
            fill-color="black"
            @click="share(iSocketData.session.id)"
        />
      </div>
    </div>
    <div v-else class="sessions-empty-list">
      {{ $t("sessions.empty_list") }}
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

import EditIcon from "vue-material-design-icons/Pen.vue";
import ShareIcon from "vue-material-design-icons/Share.vue";

import SocketService from "@/services/session";

export default {
  name: "SessionsComponent",
  props: [
    "socketData",
    "generateSession",
    "connectWebSocket",
    "disconnectWebSocket",
  ],
  components: {
    EditIcon,
    ShareIcon,
  },
  data() {
    return {
      socketDatas: [],
      command: "",
      interval: null,
    };
  },
  mounted() {
    let socketDatasJson = localStorage.getItem("socketDatas");
    if (socketDatasJson === null) {
      this.socketDatas = [];
    } else {
      this.socketDatas = JSON.parse(socketDatasJson);
    }

    document.body.addEventListener(
      "click",
      this.handleClickCopyToClipboard,
      true
    );
  },

  beforeUnmount() {
    this.clearInterval();
  },

  methods: {
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },

    async handleClickCopyToClipboard(event) {
      if (event.target.classList.contains("__handle_copy_to_clipboard")) {
        await this.copyToClipboardCommand();
      }
    },

    async copyToClipboardCommand() {
      try {
        await navigator.clipboard.writeText(this.command);
        toast.success(this.$t("sessions.code_copied_to_clipboard"));
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },

    handleInterval() {
      document.querySelector(
        ".create-session-container .swal2-confirm"
      ).disabled = this.socketData.connected_computers.length === 0;
    },

    renderModal() {
      this.handleInterval();
    },

    async create() {
      this.disconnectWebSocket();

      await this.generateSession();

      await this.connectWebSocket(this.socketData.session);

      this.socketData.name = "TEST";

      this.socketDatas.push({ ...this.socketData });
      localStorage.setItem("socketDatas", JSON.stringify(this.socketDatas));

      this.command = `wget run ${location.origin}/client.lua ${this.socketData.session.cc_session_key}`;

      this.interval = setInterval(this.handleInterval, 100);

      Swal.fire({
        title: this.$t("sessions.create_modal.title"),
        html:
          this.$t("sessions.create_modal.description") +
          `<span id="copy_cc_command" class="__handle_copy_to_clipboard">${this.command}</span><br>` +
          `<button class="cc_copy_to_clipboard __handle_copy_to_clipboard">${this.$t(
            "copy_to_clipboard"
          )}</button>`,
        customClass: {
          container: "create-session-container",
        },
        showConfirmButton: true,
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: true,
        icon: "success",
        width: "1000px",
        confirmButtonText: this.$t("modal.ok"),
        cancelButtonText: this.$t("modal.cancel"),
        didRender: this.renderModal,
      }).then(() => {
        this.clearInterval();
      });
    },

    async connect(socketData) {
      if (
        this.socketData.session &&
        socketData.session.id === this.socketData.session.id
      ) {
        return;
      }

      this.disconnectWebSocket();

      await this.connectWebSocket(socketData.session);
      this.command = `wget run ${location.origin}/client.lua ${socketData.session.cc_session_key}`;
    },

    deleteCurrentSession() {
      Swal.fire({
        title: this.$t("sessions.delete_modal.title"),
        text: this.$t("sessions.delete_modal.text"),
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: this.$t("sessions.delete_modal.confirm"),
        cancelButtonText: this.$t("modal.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          if (!this.socketData.session) return;
          localStorage.removeItem("workspace_" + this.socketData.session.id);

          let newSocketDatas = [];
          for (let socketData of this.socketDatas) {
            if (this.socketData.session.id === socketData.session.id) continue;
            newSocketDatas.push(socketData);
          }

          this.socketDatas = newSocketDatas;
          this.command = "";
          localStorage.setItem("socketDatas", JSON.stringify(this.socketDatas));

          this.disconnectWebSocket();
        }
      });
    },

    edit(id) {
      for (let iSocketData of this.socketDatas) {
        if (iSocketData.session.id !== id) continue;

        Swal.fire({
          title: this.$t("sessions.editModal.title"),
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          preConfirm: async (name) => {
            if(name.length > 10) {
              Swal.showValidationMessage(this.$t("sessions.edit_error_length"));
            }
          },
        }).then((result) => {
          if (result.isConfirmed) {
            iSocketData.name = result.value;
            localStorage.setItem("socketDatas", JSON.stringify(this.socketDatas));
          }
        });
      }

      return false;
    },

    async share(session_id) {
      let secret = await SocketService.shareSession(localStorage.getItem(`workspace_${session_id}`));



      Swal.fire({
        title: "Share code copied",
        text: "Блоки скопированы. Чтобы вставить нужно выбрать шаблон=>пользовательский код=>вставить код"
      });

      return false;
    },
  },
  computed: {
    reversedSocketDatas() {
      // Используем метод reverse() для изменения порядка элементов
      return this.socketDatas.slice().reverse();
    },
  },
};
</script>

<style scoped>
.sessions {
  background-color: #cecece;
  border-right: 1px solid #e5e5e5;
  height: calc(100vh - 50px);
  overflow-y: auto;
}

.session-title {
  width: 100%;
  text-align: center;
  display: block;
  margin: 10px 0;
  font-size: 14pt;
}

.create-session {
  background-color: gray;
  color: white;
  padding: 0 6px;
  border-radius: 3px;
  font-weight: 800;
  cursor: pointer;
}

.sessions-empty-list {
  margin: 10px;
  white-space: pre;
}

.session-item {
  padding: 0px 5%;
  width: 90%;
  min-height: 25px;
  line-height: 25px;
  cursor: pointer;
}

.session-item:hover {
  background-color: #d0d0d0;
}

.session-item.active {
  background-color: #b2b2b2;

  .session-status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: red;
    display: inline-block;
    float: left;
    margin-top: 8px;
    margin-right: 8px;
  }

  .session-status.active {
    background-color: green;
  }
}

.edit-icon {
  float: right;
  cursor: pointer;
  margin-left: 3px;
}

</style>
