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
        class="icon button-add material-symbols-outlined"
        @click="toggleInputField"
        >add</i
      >

      <Transition>
        <div v-if="parentActive">
          <div v-if="showInputField">
            <InputFieldInnerButton
              @confirm="updateFolders"
              @toggleInput="toggleInputField"
              :placeholder="'Enter new folder'"
              :inputIsValid="inputIsValid"
              type="folder"
            />
            <ErrorMsg
              t-id="TreeNode-error-duplicate-folder"
              :message="'field cannot be empty or contain duplicate'"
              :show="!inputIsValid && inputError"
              :centered="false"
              class="errMsg"
              marginSmall
            />
          </div>
          <div v-if="node.files" class="file-list">
            <File v-for="file in node.files" :key="file" :fileName="file" />
            <InputFieldInnerButton
              @confirm="updateFiles"
              @toggleInput="toggleInputField"
              :placeholder="'Enter new file'"
              :inputIsValid="inputIsValid"
              :closeButton="false"
              type="file"
            />
          </div>
          <node
            v-for="(folder, key) of node.folders"
            :key="key"
            :node="folder"
            :label="key"
            :handle-add="handleAdd"
            :handle-add-file="handleAddFile"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import File from "../File.vue";
import ErrorMsg from "../ErrorMsg.vue";
import InputFieldInnerButton from "../InputFieldInnerButton.vue";

export default {
  name: "node",
  props: {
    node: Object,
    label: {
      type: String,
      default: "Root",
    },
    handleAdd: Function,
    handleAddFile: Function,
  },
  data() {
    return {
      parentActive: true,
      showInputField: false,
      newFolderLabel: "",
      newFileLabel: "",
      inputError: false,
    };
  },
  components: {
    File,
    ErrorMsg,
    InputFieldInnerButton,
  },

  methods: {
    toggleParentActive() {
      this.parentActive = !this.parentActive;
    },

    toggleInputField() {
      this.showInputField = !this.showInputField;
      if (!this.showInputField) this.inputError = false;
    },
    updateFolders(newFolderLabel) {
      this.newFolderLabel = newFolderLabel;
      if (this.inputIsValid) {
        this.handleAdd(this.node, this.newFolderLabel);
      } else {
        this.inputError = true;
      }
    },
    updateFiles(fileName) {
      console.log("updateFiles: ", fileName);
      this.handleAddFile(this.node, fileName);
    },
  },
  computed: {
    inputIsValid() {
      return Object.keys(this.node.folders).indexOf(this.newFolderLabel) === -1;
    },
    errorText() {
      return this.inputIsValid ? "Duplicate folder" : "Empty field";
    },
  },
};
</script>

<style>
.icon {
  vertical-align: middle;
  font-size: 1.8rem;
}
.errMsg {
  font-size: 0.75em;
  margin-left: 2rem;
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
  vertical-align: middle;
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
  vertical-align: middle;
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
