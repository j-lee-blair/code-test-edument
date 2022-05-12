<template>
  <div>
    <div t-id="TreeComponent-folder" class="folder">
      <i class="icon material-icons">folder</i>
      <p t-id="TreeComponent-folder-title" class="title">{{ folder.name }}</p>
      <div v-for="file in folder.files" :key="file">
        <File :fileName="file" />
      </div>
    </div>
  </div>
</template>

<script>
import File from "./File.vue";
export default {
  props: {
    folder: Object,
  },
  components: {
    File,
  },
  mounted() {
    // console.log("FolderComp: ", this.folder);
  },
};
</script>

<style scoped>
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
