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
      class="icon icon-warning material-symbols-outlined"
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
.icon-warning:hover {
  color: var(--clr-warning-800);
}

.file-row {
  cursor: pointer;
}

.left-margin {
  margin-left: 2.6rem;
}
</style>
