<template>
  <div></div>
</template>

<script>
import Swal from "sweetalert2";
import Blockly from "blockly";

export default {
  name: "TutorialComponent",
  props: ["socketData"],
  async mounted() {
    localStorage.setItem("tutorial", "1");

    const modals = [
      this.modal1,
      this.modalSession1,
      this.modal2,
      this.modal3,
      this.modal4,
      this.modal5,
    ];

    for (let modal of modals) {
      let result = await modal();

      if (!result || !result.isConfirmed) {
        this.hideFocus();
        return;
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    async modal1() {
      return await Swal.fire(
        this.getDefaultModalOptions({
          html: this.$t("tutorial.one.description"),
          showCancelButton: true,
        })
      );
    },

    async modalSession1() {
      this.focusElement(".sessions");

      Swal.fire(
        this.getDefaultModalOptions({
          html: this.$t("tutorial.session1.description"),
        })
      ).then(() => {
        this.hideFocus();
      });

      return await new Promise((resolve) => {
        const checkTutorialInterval = setInterval(() => {
          if (
            this.socketData.session === null ||
            document.querySelector(".swal2-container") !== null
          )
            return;

          clearInterval(checkTutorialInterval);

          this.focusElement(".control-panel");
          Swal.fire(
            this.getDefaultModalOptions({
              html: this.$t("tutorial.session2.description"),
            })
          ).then((result) => {
            this.hideFocus();
            resolve(result);
          });
        }, 1000);
      });
    },

    async modal2() {
      this.focusElement(".blocklyToolboxDiv");

      return await Swal.fire(
        this.getDefaultModalOptions({
          html: this.$t("tutorial.two.description"),
          showCancelButton: true,
        })
      );
    },

    async modal3() {
      this.focusElement(".blocklyMainBackground");

      return await Swal.fire(
        this.getDefaultModalOptions({
          html: this.$t("tutorial.three.description"),
          allowOutsideClick: false,
        })
      );
    },

    async modal4() {
      this.hideFocus();

      return await Swal.fire(
        this.getDefaultModalOptions({
          html: this.$t("tutorial.four.description"),
          confirmButtonText: this.$t("tutorial.try_it"),
        })
      );
    },

    modal5() {
      new Promise((resolve) => {
        const checkTutorialInterval = setInterval(() => {
          let workspace = Blockly.getMainWorkspace();

          if (!workspace || workspace.getAllBlocks(false).length === 0) {
            return;
          }

          clearInterval(checkTutorialInterval);
          Swal.fire(
            this.getDefaultModalOptions({
              html: this.$t("tutorial.five.description"),
            })
          ).then((result) => {
            resolve(result);
          });
        }, 1000);
      });
    },

    getDefaultModalOptions(customOptions) {
      const defaultOptions = {
        title: this.$t("tutorial.title"),
        html: "",
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: this.$t("modal.continue"),
        cancelButtonText: this.$t("modal.skip"),
        iconHtml: `<img style="width: 75%; margin: auto" src="/assets/images/tutorial.png"  alt="Tutorial"/>`,
        icon: "info",
        iconColor: "#767676",
      };

      return {
        ...defaultOptions,
        ...customOptions,
      };
    },

    focusElement(query) {
      const focusableElem = document.querySelector(query);

      const rect = focusableElem.getBoundingClientRect();

      const left = rect.left;
      const top = rect.top;
      const width = rect.right - rect.left - 6;
      const height = rect.bottom - rect.top - 6;

      let focusElem = document.querySelector(".focus-elem");
      if (focusElem === null) {
        focusElem = document.createElement("div");
        focusElem.classList.add("focus-elem");
        document.body.appendChild(focusElem);
      }

      focusElem.style.left = `${left}px`;
      focusElem.style.top = `${top}px`;
      focusElem.style.width = `${width}px`;
      focusElem.style.height = `${height}px`;
    },

    hideFocus() {
      let focusElem = document.querySelector(".focus-elem");
      if (focusElem !== null) {
        focusElem.remove();
      }
    },
  },
};
</script>

<style scoped></style>
