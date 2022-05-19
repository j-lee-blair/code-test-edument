<template>
  <div t-id="Folder-folder" class="folder">
    <i class="icon material-icons">folder</i>
    <p t-id="Folder-folder-title" class="title">{{ label }}</p>
    <div v-if="node.files">
      <File v-for="file in node.files" :key="file" :fileName="file"></File>
    </div>

    <node
      v-for="(folder, key) of node.folders"
      :key="key"
      :node="folder"
      :label="key"
    />
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
  components: {
    File,
  },
};
</script>

<style scoped>
.folder::before {
  content: ">";
  margin-right: 0.5rem;
}

.folder {
  margin-left: 1rem;
}

.icon {
  vertical-align: middle;
  font-size: 1.8rem;
}

.title {
  display: inline;
  margin-left: 0.5rem;
}
</style>
