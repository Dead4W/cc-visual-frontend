<template>
  <div class="blockly-main-container">
    <ControlPanel
      class="control-panel"
      :socket-data="socketData"
      :runCode="runCode"
      :stopCode="stopCode"
      :handleCopySession="handleCopySession"
      :handleDeleteSession="handleDeleteSession"
      :handleLoadExample="handleLoadExample"
    />
    <div class="code-panel">
      <div class="blocklyDiv"></div>
      <xml style="display: none">
        <slot></slot>
      </xml>
    </div>
  </div>
</template>

<script>
import Blockly from "blockly";
import { luaGenerator } from "blockly/lua";

import * as En from "blockly/msg/en";
import * as Ru from "blockly/msg/ru";
import { useI18n } from "vue-i18n";

import ControlPanel from "@/components/ControlPanelComponent.vue";

import BlocklyOptions from "@/options/blockly";
import BlocklySectionOptions from "@/options/blockly_sections";
import Swal from "sweetalert2";

const peripheralSection = {
  kind: "category",
  name: "Peripheral",
  colour: "%{BKY_TEXTS_HUE}",
  contents: [],
};

for (let section of BlocklySectionOptions) {
  let section_key = section["name"];
  let list_items = section["list_docs"];
  let blocks = [];

  for (let list_item of list_items) {
    let key = `${section_key}_${list_item["name"]}`;

    blocks.push({
      kind: "block",
      type: key,
    });
  }

  if (section_key.includes("peripheral")) {
    let subsection_key = section_key.replace("peripheral", "").replace("/", "");

    if (subsection_key.trim() === "") {
      for (let block of blocks) {
        peripheralSection.contents.push(block);
      }
    } else {
      peripheralSection.contents.push({
        kind: "category",
        name: subsection_key,
        colour: "%{BKY_TEXTS_HUE}",
        contents: blocks,
      });
    }
  } else {
    BlocklyOptions.toolbox.contents.push({
      kind: "category",
      name: section_key,
      colour: "%{BKY_TEXTS_HUE}",
      contents: blocks,
    });
  }
}

BlocklyOptions.toolbox.contents.push(peripheralSection);

export default {
  name: "BlocklyComponent",
  props: [
    "socketData",
    "runCode",
    "stopCode",
    "handleCopySession",
    "handleDeleteSession",
  ],
  components: {
    ControlPanel,
  },
  setup() {
    luaGenerator.STATEMENT_PREFIX = "_highlightBlock(%1)\n";
    const { locale } = useI18n({ useScope: "global" });

    return {
      locale,
    };
  },
  mounted() {
    this.loadWorkspace(this.locale.value);
  },
  methods: {
    handleShowCode() {
      this.$emit("showCode");
    },

    loadLocale(locale) {
      if (locale === "ru") {
        Blockly.setLocale(Ru);
      } else {
        Blockly.setLocale(En);
      }
    },

    saveWorkspace() {
      let workspace = Blockly.getMainWorkspace();
      let json = Blockly.serialization.workspaces.save(workspace);
      localStorage.setItem(
        "workspace_" + this.socketData.session.id,
        JSON.stringify(json)
      );
      console.log("Workspace saved.");
    },

    loadWorkspace(locale) {
      this.loadLocale(locale);

      let options = BlocklyOptions;

      if (!options.toolbox) {
        options.toolbox = document.querySelector(".code-panel xml");
      }

      document.querySelector('.blocklyDiv').innerHTML = "";
      Blockly.inject(document.querySelector(".blocklyDiv"), options);
      let workspace = Blockly.getMainWorkspace();

      let json = localStorage.getItem(
        "workspace_" + this.socketData.session.id
      );

      if (json) {
        workspace.clear();
        Blockly.serialization.workspaces.load(JSON.parse(json), workspace);
      }

      workspace.addChangeListener(() => {
        this.handleShowCode();
        this.saveWorkspace();
      });
    },

    handleLoadExample(json) {
      let workspace = Blockly.getMainWorkspace();

      let currentJson = Blockly.serialization.workspaces.save(workspace);

      if (!currentJson || Object.keys(currentJson).length === 0) {
        this.loadWorkspaceCode(JSON.parse(json));
        return;
      }

      Swal.fire({
        title: this.$t("control.example_confirm.title"),
        text: this.$t("control.example_confirm.description"),
        showDenyButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadWorkspaceCode(JSON.parse(json));
        }
      });
    },

    loadWorkspaceCode(json) {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
      Blockly.serialization.workspaces.load(json, workspace);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}

.blockly-main-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.control-panel {
  background-color: #cecece;
  width: 100%;
  height: 30px;
}

.code-panel {
  height: calc(100% - 30px);
}
</style>
