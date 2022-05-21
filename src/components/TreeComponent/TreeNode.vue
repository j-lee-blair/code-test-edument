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
      <Transition>
        <div v-if="parentActive">
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
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import File from "../File.vue";
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
    };
  },
  components: {
    File,
  },
  methods: {
    toggleParentActive() {
      this.parentActive = !this.parentActive;
    },
  },
};
</script>

<style scoped>
/* .folder::before {
  content: ">";
  margin-right: 0.5rem;
} */

.folder {
  margin-left: 1.5rem;
}

.icon {
  vertical-align: middle;
  font-size: 1.8rem;
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
