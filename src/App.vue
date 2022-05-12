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
          :propsData="jsonData"
        />
      </keep-alive>
    </section>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import TreeComponent from "./components/TreeComponent.vue";
import { generateTree } from "./dataUtilities";
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
    handleCallback(data = [], componentName = "") {
      switch (componentName) {
        case "InputForm":
          this.jsonData = generateTree(data);
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
