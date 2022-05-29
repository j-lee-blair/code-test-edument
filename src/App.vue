<template>
  <div id="app" class="container">
    <section>
      <header class="text-center">File Tree</header>
    </section>
    <section>
      <span
        v-if="activeView !== 'InputForm'"
        @click="activeView = 'InputForm'"
        class="back-btn"
      >
        <i class="material-symbols-outlined"> arrow_back_ios </i>
        Back
      </span>

      <!-- this component retains the state of the active views -->
      <!-- the "component" component is replaced according to the active view -->
      <!-- the callback is passed down to child components to either trigger a view change, or update the state variable 'root' -->
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
      switch (componentName) {
        case "InputForm":
          this.root = await toTreeStructure(data);
          this.activeView = "TreeComponent";
          break;
        case "TreeComponent":
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
