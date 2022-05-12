<template>
  <div t-id="TreeComponent">
    <div v-for="folder in propsData.root.folders" :key="folder.name">
      <Folder :folder="folder" />
    </div>
  </div>
</template>

<script>
import Folder from "./Folder.vue";
export default {
  props: {
    propsData: {
      type: Object,
      // required: true,
    },
  },
  mounted() {
    // console.log("TreeComp: ", this.propsData);
  },
  components: { Folder },
};
</script>

<style></style>
