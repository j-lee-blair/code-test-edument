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
        v-if="!showInputField"
        t-id="Folder-folder-add"
        class="icon button button-add material-symbols-outlined"
        @click="showInputField = true"
        >add</i
      >
      <Transition>
        <div v-if="parentActive">
          <div v-if="showInputField">
            <div class="input-icon">
              <i
                t-id="Folder-folder-add"
                class="icon input-btn material-symbols-outlined"
                @click="addSubfolder"
                >add</i
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
            @update-topNode="updateTopNode"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import File from "../File.vue";
import { CreateFolder } from "../../dataUtilities";

export default {
  name: "node",
  props: {
    node: Object,
    label: {
      type: String,
      default: "Root",
    },
  },
  data() {
    return {
      parentActive: true,
      showInputField: false,
      inputData: "",
      inputError: false,
    };
  },
  components: {
    File,
  },
  methods: {
    toggleParentActive() {
      this.parentActive = !this.parentActive;
    },
    toggleInputField() {
      this.showInputField = !this.showInputField;
    },
    addSubfolder() {
      if (this.inputIsValid()) {
        const updatedNode = CreateFolder(this.node, this.inputData, this.label);
        console.log("updatedNode: ", updatedNode);
        this.updateTopNode(updatedNode);
        //this.inputError = false;
        this.newEntry = "";
      }
    },
    inputIsValid() {
      this.inputError =
        Object.keys(this.node.folders).indexOf(this.inputData) === -1 &&
        this.inputData !== "";
      return this.inputError;
    },
    updateTopNode(props) {
      this.$emit("update-tree", props);
    },
  },
};
</script>

<style>
.icon {
  vertical-align: middle;
  font-size: 1.8rem;
}

.input-btn {
  margin-left: 13.3rem;
  border: solid 0.5px black;
  max-height: 1.7rem;
  margin-top: 0.4rem;
  border-radius: 0.4rem;
  font-size: 1em;
  cursor: pointer;
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
