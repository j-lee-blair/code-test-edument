<template>
  <div class="input-icon">
    <i
      :t-id="`InputField-inner-button-confirm-${type}`"
      class="icon input-btn confirm material-symbols-outlined"
      @click="confirm"
      >add</i
    >
    <i
      v-if="closeButton"
      class="icon input-btn close material-symbols-outlined"
      @click="toggleInput"
      >close</i
    >
    <input
      :t-id="`InputField-inner-button-${type}`"
      class="new-item"
      ref="addItem"
      type="text"
      :placeholder="placeholder"
      maxlength="30"
      v-model="inputData"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    inputIsValid: Boolean,
    closeButton: {
      type: Boolean,
      default: true,
    },
    type: String,
  },
  data() {
    return {
      inputData: "",
    };
  },
  mounted() {
    if (this.type === "folder") this.$refs.addItem.focus();
  },
  methods: {
    toggleInput() {
      //emit type so parent can toggle correct input
      this.$emit("toggleInput");
    },
    confirm() {
      this.$emit("confirm", this.inputData);
    },
  },
};
</script>

<style scoped>
.input-btn {
  min-width: none;
  vertical-align: text-bottom;
  cursor: pointer;
}

.new-item {
  vertical-align: middle;
  min-width: 15rem;
}

.confirm {
  margin-left: 13.3rem;
  border: solid 0.5px black;
  max-height: 1.7rem;
  margin-top: 0.4rem;
  border-radius: 0.4rem;
  font-size: 1em;
}
.close {
  cursor: pointer;
  margin-left: 15.5rem;
  margin-top: 0.2rem;
}
.input-icon i {
  position: absolute;
}
.input-icon {
  margin-left: 2.8rem;
  position: relative;
}
.input-btn:hover {
  background: var(--clr-secondary-100);
  color: var(--clr-accent-800);
}
</style>
