<template>
  <div class="left-indent">
    <i class="icon material-symbols-outlined">insert_drive_file</i>
    <p t-id="File-file-name" class="title">
      {{ fileName }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    fileName: {
      type: String,
    },
  },
};
</script>

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 1.8rem;
}

.title {
  display: inline;
}

.left-indent {
  margin-left: 2.6rem;
}
</style>
