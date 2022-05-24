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
          :propsData="root"
        />
      </keep-alive>
    </section>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import TreeComponent from "./components/TreeComponent/TreeComponent.vue";
import { toTreeStructure } from "./dataUtilities";
export default {
  name: "App",
  components: {
    InputForm,
    TreeComponent,
  },
  data: function () {
    return {
      activeView: "InputForm",
      root: {},
    };
  },
  methods: {
    async handleCallback(data = {}, componentName = "") {
      //console.log("handleCallBack: ", data, componentName);
      switch (componentName) {
        case "InputForm":
          this.root = await toTreeStructure(data);
          // console.log("App:: root= ", JSON.stringify(this.root));
          this.activeView = "TreeComponent";
          break;
        case "TreeComponent":
          console.log("App:: ", data);
          this.root = data;
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
