<template>
  <div>
    <div t-id="Folder-folder" class="folder">
      <i class="icon material-icons">folder</i>
      <p t-id="Folder-folder-title" class="title">{{ folder.name }}</p>
      <div v-for="file in entries[1].files" :key="file">
        <File :fileName="file" />
      </div>
    </div>
  </div>
</template>

<script>
import File from "./File.vue";
export default {
  props: {
    entries: Array,
  },
  components: {
    File,
  },
};
</script>

<style scoped>
.folder {
  margin-left: 0.5rem;
}

.folder::before {
  content: ">";
  margin-right: 0.5rem;
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
