<template>
  <div t-id="TreeComponent">
    <TreeNode
      :node="propsData"
      :handle-add="handleAdd"
      :handle-add-file="handleAddFile"
      :key="renderKey"
    ></TreeNode>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";
import { CreateFolder, PushFile } from "../../dataUtilities";
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
    handleAdd(updatedNode, newNodeLabel) {
      const node = CreateFolder(updatedNode, newNodeLabel);
      this.updateTree(node);
      this.forceRerender();
    },

    handleAddFile(updatedNode, newFile) {
      const node = PushFile(updatedNode, newFile);
      this.updateTree(node);
      this.forceRerender();
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
