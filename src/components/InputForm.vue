<template>
  <div t-id="InputForm">
    <p>Enter your JSON string to see File Tree</p>
    <div>
      <input
        t-id="InputForm-input-field"
        type="text"
        class="input-field"
        v-model="jsonInput"
      />
      <input
        t-id="InputForm-button"
        type="button"
        class="button text-center"
        value="OK"
        @click="validateJsonString"
      />
    </div>
    <ErrorMsg t-id="InputForm-json-error" :show="invalidJson" />
  </div>
</template>

<script>
import ErrorMsg from "./ErrorMsg.vue";
export default {
  components: { ErrorMsg },
  name: "InputForm",
  data: () => {
    return {
      jsonInput: "",
      invalidJson: false,
    };
  },

  methods: {
    validateJsonString() {
      try {
        JSON.parse(this.jsonInput);
        this.invalidJson = false;
      } catch (e) {
        this.invalidJson = true;
      } finally {
        if (this.invalidJson === false) {
          this.$emit("childCallback", this.jsonInput, this.$options.name);
        }
      }
    },
  },
};
</script>

<style></style>
