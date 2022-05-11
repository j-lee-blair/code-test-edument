<template>
  <div id="app" class="container">
    <section>
      <header class="text-center">JSON Tree Viewer</header>
    </section>
    <section>
      <input-form class="text-center" />
    </section>
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
