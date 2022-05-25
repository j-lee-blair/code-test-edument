<template>
  <div>
    <div class="folder">
      <span t-id="Folder-folder" @click="toggleParentActive">
        <i
          class="icon material-symbols-outlined arrow"
          :class="parentActive ? 'open' : ''"
          >play_arrow</i
        >
        <i class="icon material-symbols-outlined">folder</i>
        <p t-id="Folder-folder-title" class="title">{{ label }}</p>
      </span>
      <i
        v-if="parentActive && !showInputField"
        t-id="Folder-folder-add"
        class="icon button button-add material-symbols-outlined"
        @click="toggleInputField"
        >add</i
      >
      <Transition>
        <div v-if="parentActive">
          <div v-if="showInputField">
            <div class="input-icon">
              <i
                t-id="Folder-folder-add-confirm"
                class="icon input-btn confirm material-symbols-outlined"
                @click="handleAdd(node, inputIsValid, inputData)"
                >add</i
              >
              <i
                class="icon input-btn close material-symbols-outlined"
                @click="toggleInputField"
                >close</i
              >
              <input
                t-id="Folder-new-folder-input"
                class="new-folder"
                ref="addFolder"
                type="text"
                placeholder="Enter new folder"
                maxlength="30"
                v-model="inputData"
              />

              <ErrorMsg
                t-id="TreeNode-error-duplicate-folder"
                message="Duplicate folder"
                :show="!inputIsValid && inputError"
                :centered="false"
                class="errMsg"
                marginSmall
              />
            </div>
          </div>
          <div v-if="node.files">
            <File
              v-for="file in node.files"
              :key="file"
              :fileName="file"
            ></File>
          </div>
          <node
            v-for="(folder, key) of node.folders"
            :key="key"
            :node="folder"
            :label="key"
            :handle-add="handleAdd"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import File from "../File.vue";
import ErrorMsg from "../ErrorMsg.vue";

export default {
  name: "node",
  props: {
    node: Object,
    label: {
      type: String,
      default: "Root",
    },
    handleAdd: Function,
  },
  data() {
    return {
      parentActive: true,
      showInputField: false,
      inputData: "",
      inputError: false,
    };
  },

  updated() {
    this.inputError = this.inputData !== "" && !this.inputIsValid;
    if (this.showInputField) {
      this.$refs.addFolder.focus();
    }
  },
  components: {
    File,
    ErrorMsg,
  },

  methods: {
    toggleParentActive() {
      this.parentActive = !this.parentActive;
    },
    toggleInputField() {
      //this.inputData = "";

      this.showInputField = !this.showInputField;
    },
  },
  computed: {
    inputIsValid() {
      return (
        Object.keys(this.node.folders).indexOf(this.inputData) === -1 &&
        this.inputData !== ""
      );
    },
  },
};
</script>

<style scoped>
.errMsg {
  font-size: 0.75em;
}

.icon {
  vertical-align: middle;
  font-size: 1.8rem;
}

.input-btn {
  cursor: pointer;
}

.confirm {
  margin-left: 13.3rem;
  border: solid 0.5px black;
  max-height: 1.7rem;
  margin-top: 0.4rem;
  border-radius: 0.4rem;
  font-size: 1em;
}

.close {
  cursor: pointer;
  margin-left: 15.5rem;
  margin-top: 0.2rem;
}

.input-icon i {
  position: absolute;
}

.input-icon {
  margin-left: 2rem;
}

.input-btn:hover {
  background: var(--clr-secondary-100);
  color: var(--clr-primary-400);
}

.new-folder {
  vertical-align: middle;
  min-width: 15rem;
}

.folder {
  margin-left: 1.5rem;
}

.button-add {
  margin-left: 0.5rem;
}

.arrow {
  transform: rotate(0deg);
  transition: transform 0.1s ease-out;
}

.arrow.open {
  transform: rotate(90deg);
}

.title {
  display: inline;
  margin-left: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
  transform: translateY(-1rem);
}

.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  transform: translateY(0.1rem);
}

.v-leave-from,
.v-leave-to {
  opacity: 0;
}
</style>
