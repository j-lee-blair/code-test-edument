<template>
  <div class="left-margin">
    <i class="icon material-symbols-outlined">insert_drive_file</i>
    <p t-id="File-file-name" class="title">
      {{ fileName }}
    </p>
    <i
      v-if="hover"
      class="icon material-symbols-outlined addfile-btn"
      @click="toggleInput"
      >add</i
    >
  </div>
</template>

<script>
export default {
  props: {
    fileName: {
      type: String,
    },
  },

  data() {
    return {
      hover: false,
      showInputField: false,
    };
  },
  methods: {
    toggleInput() {
      this.showInputField = !this.showInputField;
      this.$forceUpdate();
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

.title {
  display: inline;
}

.left-margin {
  margin-left: 2.6rem;
}
</style>
