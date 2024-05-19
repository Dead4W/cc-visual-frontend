<template>
  <div>
    <div
      class="control-item control-icon"
      :title="
        $t(
          socketData.ide_state === IDE_STATE.IDLE
            ? 'control.run'
            : 'control.stop'
        )
      "
    >
      <PlayIcon
        v-if="socketData.ide_state === IDE_STATE.IDLE"
        @click="runCode"
        :title="$t('control.run')"
        :size="24"
        fill-color="green"
      />
      <StopIcon v-else @click="stopCode" :size="24" fill-color="red" />
    </div>

    <div class="control-item"></div>

    <div
      class="control-item control-icon"
      :title="$t('control.copy_session_code')"
    >
      <CopyIcon @click="handleCopySession" :size="24" fill-color="blue" />
    </div>

    <div
      class="control-item control-icon"
      :title="$t('control.delete_session')"
    >
      <DeleteIcon @click="handleDeleteSession" :size="24" fill-color="red" />
    </div>

    <div class="control-item"> </div>
    <div class="control-item"> </div>
    <div class="control-item"> </div>
    <div class="control-item"> </div>
    <div class="control-item"> </div>

    <div class="control-item control-text">
      <select id="exampleSelector" @change="changeExample">
        <option :value="name" v-for="name in Object.keys(EXAMPLES)">
          {{ $t(`control.example.${name}`) }}
        </option>
      </select>
    </div>

    <!--    <BugIcon-->
    <!--      class="control-icon"-->
    <!--      title="{{$t('control.bug')}}"-->
    <!--      :size="24"-->
    <!--      :fill-color="socketData.ide_state === IDE_STATE.IDLE ? 'gray' : 'green'"-->
    <!--    />-->
  </div>
</template>

<script lang="ts">
import Swal from "sweetalert2";

import PlayIcon from "vue-material-design-icons/Play.vue";
import StopIcon from "vue-material-design-icons/Stop.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import CopyIcon from "vue-material-design-icons/ContentCopy.vue";

import SocketService from "@/services/session";

import IDE_STATE from "@/enums/ide_states";

export default {
  name: "ControlPanel",
  props: [
    "socketData",
    "stopCode",
    "runCode",
    "handleCopySession",
    "handleDeleteSession",
    "handleLoadExample",
  ],
  components: {
    PlayIcon,
    StopIcon,
    DeleteIcon,
    CopyIcon,
  },
  data() {
    return {
      EXAMPLES: {
        none: "",
        user_code: "",
        turtle_miner:
          '{"blocks":{"languageVersion":0,"blocks":[{"type":"procedures_defnoreturn","id":"}v{iuI/uh%1b*LUZe7Pa","x":-587,"y":138,"icons":{"comment":{"text":"Dig function","pinned":false,"height":80,"width":160}},"fields":{"NAME":"dig"},"inputs":{"STACK":{"block":{"type":"turtle_dig","id":"kS9S~5Y,(M3RL|e/Q3,s","next":{"block":{"type":"turtle_digUp","id":"U:q}%Cd/Utpq1;FZ92Fk","next":{"block":{"type":"turtle_digDown","id":"SKy(j[;6G4{L1XDzk#G^","next":{"block":{"type":"turtle_forward","id":"wf{9n3H~PCn/v0*Q=|NM"}}}}}}}}}},{"type":"procedures_callnoreturn","id":"U`-62_HpGp*~.Xk24v{x","x":-362,"y":138,"extraState":{"name":"dig"},"next":{"block":{"type":"turtle_turnLeft","id":"/=.+f,J)]YQ,c^MpV{Fw","next":{"block":{"type":"procedures_callnoreturn","id":")Y]joC[xmvPq7XTQAfhG","extraState":{"name":"dig"},"next":{"block":{"type":"turtle_turnRight","id":"~[b`m.2kGenvYM$Wap3}","next":{"block":{"type":"controls_whileUntil","id":"gD?Ml|$ZF5y;Aln?v7/r","fields":{"MODE":"WHILE"},"inputs":{"BOOL":{"block":{"type":"logic_boolean","id":"HMrWsRfo}u:OudAim82r","fields":{"BOOL":"TRUE"}}},"DO":{"block":{"type":"procedures_callnoreturn","id":"%%sI8K($(Ht/|e*_G5k;","extraState":{"name":"dig"},"next":{"block":{"type":"turtle_turnRight","id":"ENdVU{f~{v|,Q6R!FpI=","next":{"block":{"type":"procedures_callnoreturn","id":"?)%_LsJ[x]ntdEri*]J^","extraState":{"name":"dig"},"next":{"block":{"type":"procedures_callnoreturn","id":"0Jodk4_{i_?ol;so#i^+","extraState":{"name":"dig"},"next":{"block":{"type":"turtle_turnLeft","id":"[xQs/fVES)~iEwl,`57^","next":{"block":{"type":"procedures_callnoreturn","id":"aTb70qeY2FIoigHALCk)","extraState":{"name":"dig"},"next":{"block":{"type":"turtle_turnLeft","id":"jk/Z8d;j{*7Oe2S1#A-Y","next":{"block":{"type":"procedures_callnoreturn","id":"/;R6%Ktxs{t090z3mh`Z","extraState":{"name":"dig"},"next":{"block":{"type":"procedures_callnoreturn","id":"FQMjs}adw?u:J[_`DfKj","extraState":{"name":"dig"},"next":{"block":{"type":"turtle_turnRight","id":"phpUf6Y,LQ^?_%`OX]6|"}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}]}}',
      },
      IDE_STATE: IDE_STATE,
    };
  },

  methods: {
    changeExample(event) {
      let exampleKey = event.target.value;

      if (exampleKey === "none") return;

      if (exampleKey === "user_code") {
        Swal.fire({
          title: this.$t("control.loadTitle"),
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          preConfirm: async (secret) => {
            try {
              let response = await SocketService.getShareSession(secret);

              return response['json'];
            } catch (error) {
              Swal.showValidationMessage(`Share code error: ${error}`);
            }
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.handleLoadExample(result.value);
          }
        });
        return;
      }

      let exampleCode = this.EXAMPLES[event.target.value];

      this.handleLoadExample(exampleCode);
    },
  },
};
</script>

<style scoped>
.control-item {
  float: left;
  height: 24px;
  padding: 3px;
}

.control-icon {
  width: 24px;
  background-color: #bcb8b8;
  cursor: pointer;
  margin-right: 5px;
}

.control-text {
  line-height: 24px;
}

.control-icon:hover {
  background-color: #afabab;
}
</style>
