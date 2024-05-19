<template>
  <div id="app">
    <header>
      <div class="header-section-center">ComputerCraft Visual</div>
      <LocaleChanger />
    </header>
    <div class="flex-container">
      <SessionsComponent
        class="sessions-container"
        ref="sessionComponent"
        :socketData="socketData"
        :generateSession="generateSession"
        :connectWebSocket="connectWebSocket"
        :disconnectWebSocket="disconnectWebSocket"
      />
      <BlocklyComponent
        v-if="socketData.session !== null"
        id="blockly2"
        :socketData="socketData"
        :runCode="runCode"
        :stopCode="stopCode"
        :handleCopySession="handleCopySession"
        :handleDeleteSession="handleDeleteSession"
      />
      <div v-else id="blockly2" class="disabled">
        <div class="blockly_disabled">
          {{ $t("wait_for_session") }}
        </div>
      </div>
    </div>
    <TutorialComponent :socketData="socketData" v-if="needTutorial" />
  </div>
</template>

<script>
import "vue3-toastify/dist/index.css";

import "./blocks/stocks";
import IDE_STATE from "./enums/ide_states";
import SOCKET_STATE from "./enums/socket_states";
import MESSAGE_TYPE from "./enums/message_types";

import { luaGenerator } from "blockly/lua";

import BlocklyComponent from "./components/BlocklyComponent.vue";
import LocaleChanger from "./components/LocaleChanger.vue";
import SessionsComponent from "./components/SessionsComponent.vue";
import TutorialComponent from "./components/TutorialComponent.vue";

import { toast } from "vue3-toastify";
import SocketService from "@/services/session";
import {ref} from "vue";
import Blockly from "blockly";

export default {
  name: "App",
  components: {
    TutorialComponent,
    SessionsComponent,
    LocaleChanger,
    BlocklyComponent,
  },
  data() {
    return {
      socket: null,
      socketData: {
        state: SOCKET_STATE.DISCONNECTED,
        ide_state: IDE_STATE.IDLE,
        connected_computers: [],
        session: null,
      },
      needTutorial: !("tutorial" in localStorage),
      isStop: false,
    };
  },
  methods: {
    ref,
    handleCopySession() {
      this.$refs.sessionComponent.copyToClipboardCommand();
    },
    handleDeleteSession() {
      this.$refs.sessionComponent.deleteCurrentSession();
    },

    async generateSession() {
      this.socketData.session = await SocketService.generateSession();
    },
    disconnectWebSocket() {
      this.logBlock(null);

      this.socketData.state = SOCKET_STATE.DISCONNECTED;
      this.socketData.ide_state = IDE_STATE.IDLE;
      this.socketData.connected_computers = [];
      this.socketData.session = null;

      if (this.socket) {
        this.socket.onclose = () => {};
        this.socket.onopen = () => {};
        this.socket.onmessage = () => {};
        this.socket.onclose = () => {};
        this.socket.onerror = () => {};

        this.socket.close();

        this.socket = null;
      }
    },

    logBlock(id) {
      let workspace = Blockly.getMainWorkspace();

      if (workspace) {
        workspace.highlightBlock(id);
      }
    },

    connectWebSocket(session) {
      this.socket = new WebSocket(
        `wss://socket.cc-visual.dev?session_key=${session.web_ide_session_key}`
      );

      this.socket.onopen = () => {
        this.socketData.state = SOCKET_STATE.CONNECTED;
        this.socketData.ide_state = IDE_STATE.IDLE;
        this.socketData.connected_computers = [];
        this.socketData.session = session;
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === MESSAGE_TYPE.LIST_CONNECTIONS) {
          this.socketData.connected_computers = data.data;
        } else if (data.type === MESSAGE_TYPE.NEW_CONNECTION) {
          this.socketData.connected_computers.push(data.meta.from.id);
        } else if (data.type === MESSAGE_TYPE.CLOSED_CONNECTION) {
          let index = this.socketData.connected_computers.indexOf(
            data.meta.from.id
          );
          if (index !== -1) {
            this.socketData.connected_computers.splice(index, 1);
          }
        } else if (data.type === "message") {
          let subtype = data.data.subtype;

          if (subtype === "state") {
            this.socketData.ide_state = data.data.data;
            this.logBlock(null);
          } else if (subtype === "run_print") {
            toast.info(`print: ${data.data.data}`);
          } else if (subtype === "run_print_error" || subtype === "run_error") {
            if (!this.isStop) {
              toast.error(`printError: ${data.data.data}`);
            }
            this.logBlock(null);
          } else if (subtype === "log_block") {
            this.logBlock(data.data.data);
            if (this.isStop) {
              this.sendToSocket("stop");
              toast.error("Terminated")
            } else {
              this.sendToSocket("run_next_block");
            }
          } else if (subtype === "run_end") {
            this.socketData.ide_state = IDE_STATE.IDLE;
            this.logBlock(null);
          }
        }
      };

      this.socket.onclose = () => {
        this.disconnectWebSocket();
      };

      this.socket.onerror = (error) => {
        const error_msg = error.message;
        toast.error("ERROR: " + error_msg, {
          autoClose: false,
        });
        this.disconnectWebSocket();
      };
    },

    runCode() {
      this.isStop = false;
      let workspace = Blockly.getMainWorkspace();
      let code = luaGenerator.workspaceToCode(workspace);

      const regex = /\n(,99)+/gi;
      code = code.replaceAll(regex, "\n");

      console.log(code);

      this.sendToSocket(
        "run",
          code,
      );
    },

    stopCode() {
      this.isStop = true;
    },

    sendToSocket(type, data) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({
            subtype: type,
            data: data,
          })
        );
      }
    },
  },
};
</script>

<style>
@keyframes fadeInOut {
  0%,
  100% {
    background-color: rgba(255, 255, 255, 0); /* Прозрачный */
  }
  50% {
    background-color: rgb(255, 255, 255, 0.3); /* Полупрозрачный белый */
  }
}

.focus-elem {
  position: absolute;
  z-index: 999;
  border: 3px solid red;
  animation: fadeInOut 1s infinite; /* Повторение анимации */
}

@font-face {
  font-family: "Monocraft";
  font-style: normal;
  src: url(/assets/fonts/Monocraft-nerd-fonts-patched.ttf) format("truetype");
}

header {
  height: 50px;
  width: 100%;
  font-family: "Monocraft", monospace;
  background-color: #2e2d2d;
  color: white;

  display: flex; /* Включаем Flexbox */
  justify-content: center; /* Центрируем элементы по горизонтали */
  align-items: center; /* Центрируем элементы по вертикали */
  gap: 20px; /* Отступ между элементами */
}

.header-section-center {
  line-height: 50px;
  width: fit-content;
  height: 100%;
  font-size: 24px;
  font-weight: 500;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

#code {
  height: 100%;
  background-color: beige;
  flex-basis: 10%; /* Ширина блока всегда 10% */
  max-width: 10%; /* Максимальная ширина блока 10% */
}

#blockly2 {
  position: relative;
  height: 100%;
  flex-basis: 90%;
  max-width: 90%;
}

.flex-container {
  position: relative;
  justify-content: space-between;
  height: calc(100vh - 50px);
  display: flex;
}

.sessions-container {
  flex-basis: 10%; /* Ширина блока всегда 10% */
  max-width: 10%; /* Максимальная ширина блока 10% */
  overflow-x: hidden;
}

#copy_cc_command {
  background: #f7f7f7;
  color: #6c6c6c;
  padding: 2px 10px;
  border: 1px solid #cacaca;
  cursor: pointer;
}

.cc_copy_to_clipboard {
  margin-top: 5px;
  background: #f7f7f7;
  border: 1px solid #7e7e7e;
  padding: 3px 10px;
  border-radius: 2px;
  cursor: pointer;
}

#blockly2.disabled {
  background-color: #dddddd;
  position: relative;

  .blockly_disabled {
    position: relative;
    width: fit-content;
    margin: auto;
    top: calc(50% - 12pt);
    font-weight: 800;
    font-size: 12pt;
  }
}
</style>
