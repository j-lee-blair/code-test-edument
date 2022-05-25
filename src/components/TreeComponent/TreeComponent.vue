<template>
  <div t-id="TreeComponent">
    <TreeNode
      :node="propsData"
      :handle-add="handleAdd"
      :key="renderKey"
    ></TreeNode>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";
import { CreateFolder } from "../../dataUtilities";
export default {
  name: "TreeComponent",
  props: {
    propsData: {
      type: Object,
    },
  },
  data() {
    return {
      renderKey: 0,
    };
  },
  components: {
    TreeNode,
  },
  methods: {
    handleAdd(updatedNode, inputIsValid, newNodeLabel) {
      if (inputIsValid) {
        const node = CreateFolder(updatedNode, newNodeLabel);
        this.updateTree(node);
        this.forceRerender();
      }
    },
    updateTree(updatedNode) {
      this.$emit("childCallback", updatedNode, this.$options.name);
    },
    forceRerender() {
      this.renderKey += 1;
    },
  },
};
</script>

<style></style>
