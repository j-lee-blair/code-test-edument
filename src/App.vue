<template>
  <div id="app" class="container text-center">
    <div class="section">
      <h1>JSON Tree Viewer</h1>
    </div>
    <div class="section">
      <input-form />
    </div>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
export default {
  name: "App",
  components: { InputForm },
};
</script>

<style></style>
