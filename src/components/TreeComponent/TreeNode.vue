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
              type="folder"
            />
            <ErrorMsg
              t-id="TreeNode-error-duplicate-folder"
              :message="'field cannot be empty or contain duplicate'"
              :show="inputErrorFolder"
              :centered="false"
              class="error-msg"
              marginSmall
            />
          </div>
          <div v-if="node.files" class="file-list">
            <File
              v-for="file in node.files"
              :key="file"
              :fileName="file"
              :handleDelete="deleteFile"
            />
            <InputFieldInnerButton
              @confirm="updateFiles"
              @toggleInput="toggleInputField"
              :placeholder="'Enter new file'"
              :closeButton="false"
              type="file"
            />
            <ErrorMsg
              t-id="TreeNode-error-duplicate-file"
              :message="'field cannot be empty or contain duplicate'"
              :show="inputErrorFile"
              :centered="false"
              class="error-msg"
              marginSmall
            />
          </div>
          <node
            v-for="(folder, key) of node.folders"
            :key="key"
            :node="folder"
            :label="key"
            :handle-add="handleAdd"
            :handle-add-file="handleAddFile"
            :handle-delete-file="handleDeleteFile"
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
    handleDeleteFile: Function,
  },
  data() {
    return {
      parentActive: false,
      showInputField: false,
      inputErrorFolder: false,
      inputErrorFile: false,
    };
  },
  components: {
    File,
    ErrorMsg,
    InputFieldInnerButton,
  },

  mounted() {
    if (this.label === "Root") this.parentActive = true;
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
      if (this.inputIsValid(newFolderLabel, "FOLDER")) {
        this.handleAdd(this.node, newFolderLabel);
      } else {
        this.inputErrorFolder = true;
      }
    },
    updateFiles(fileName) {
      if (this.inputIsValid(fileName, "FILE")) {
        this.handleAddFile(this.node, fileName);
      } else {
        this.inputErrorFile = true;
      }
    },
    inputIsValid(data, type) {
      switch (type) {
        case "FOLDER":
          return (
            Object.keys(this.node.folders).indexOf(data) === -1 && data !== ""
          );
        case "FILE":
          return this.node.files.indexOf(data) === -1 && data !== "";
        default:
          return false;
      }
    },
    deleteFile(toBeDeleted) {
      this.handleDeleteFile(this.node, toBeDeleted);
    },
  },
  computed: {
    errorText() {
      return this.inputIsValid ? "Duplicate folder" : "Empty field";
    },
  },
};
</script>

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 1.8rem;
}
.error-msg {
  font-size: 0.75em;
  margin-left: 2.8rem;
}

.folder > span {
  cursor: pointer;
}

.folder {
  margin-left: 1.5rem;
}

.button-add {
  margin-left: 0.5rem;
  vertical-align: middle;
  cursor: pointer;
}
.button-add:hover {
  color: var(--clr-primary-400);
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
