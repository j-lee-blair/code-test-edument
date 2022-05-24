<template>
  <div t-id="TreeComponent">
    <TreeNode :node="propsData" @update-tree="updateTree"></TreeNode>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";
export default {
  name: "TreeComponent",
  props: {
    propsData: {
      type: Object,
    },
  },
  components: {
    TreeNode,
  },
  methods: {
    updateTree(newTree) {
      console.log("TreeComponent listenener", newTree);
      this.$emit("childCallback", newTree, this.$options.name);
    },
  },
};
</script>

<style></style>
