<template>
  <div id="app" class="container">
    <section>
      <header class="text-center">JSON Tree Viewer</header>
    </section>
    <section>
      <keep-alive>
        <component
          :is="activeView"
          @childCallback="handleCallback"
          class="text-center"
          :propsData="jsonData"
        />
      </keep-alive>
    </section>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import TreeComponent from "./components/TreeComponent.vue";
export default {
  name: "App",
  components: {
    InputForm,
    TreeComponent,
  },
  data: function () {
    return {
      activeView: "InputForm",
      jsonData: "",
    };
  },
  methods: {
    handleCallback(data = {}, componentName = "") {
      console.log("data: ", data, "\nname: ", componentName);
      switch (componentName) {
        case "InputForm":
          this.jsonData = data;
          this.activeView = "TreeComponent";
          break;
        default:
          this.activeView = "InputForm";
      }
    },
  },
};
</script>

<style></style>
