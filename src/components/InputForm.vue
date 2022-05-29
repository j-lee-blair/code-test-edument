<template>
  <div t-id="InputForm" class="text-center">
    <p>Enter JSON string array</p>
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
    <ErrorMsg
      t-id="InputForm-json-error"
      :show="jsonInvalid"
      centered
      :message="`Input must be string array ['string']`"
    />
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
      jsonInvalid: false,
    };
  },

  methods: {
    validateJsonString() {
      let jsonString;
      try {
        jsonString = JSON.parse(this.jsonInput);
        this.jsonInvalid = !Array.isArray(jsonString) ? true : false;
      } catch (e) {
        this.jsonInvalid = true;
      } finally {
        if (!this.jsonInvalid) {
          this.$emit("childCallback", jsonString, this.$options.name);
        }
      }
    },
  },
};
</script>

<style></style>
