<template>
  <div class="left-margin">
    <span class="file-row">
      <i class="icon material-symbols-outlined">insert_drive_file</i>
      <p t-id="File-file-name" class="title" @click="toggleDeleteButton">
        {{ fileName }}
      </p>
    </span>
    <i
      t-id="File-remove-file-button"
      v-if="showDeleteButton"
      class="icon material-symbols-outlined"
      @click="handleDelete(fileName)"
      >delete</i
    >
  </div>
</template>

<script>
export default {
  props: {
    fileName: {
      type: String,
    },
    handleDelete: Function,
  },

  data() {
    return {
      showInputField: false,
      showDeleteButton: false,
      selectedFile: "",
    };
  },
  methods: {
    toggleInput() {
      this.showDeleteButton;
      this.showInputField = !this.showInputField;
      this.$forceUpdate();
    },
    toggleDeleteButton() {
      this.showDeleteButton = !this.showDeleteButton;
    },
  },
};
</script>

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 1.8rem;
  cursor: pointer;
}

.file-row {
  cursor: pointer;
}

.title {
  display: inline;
}

.left-margin {
  margin-left: 2.6rem;
}
</style>
