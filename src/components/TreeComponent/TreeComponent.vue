<template>
  <!-- this component is basically a manager for various update methods  -->
  <!-- it acts as a broker between the parent state 'root' and the various TreeNode component's recursive children  -->
  <!-- I had some trouble getting the view to refresh even though the root node had changed state, but found a nifty method using a simple key counter (see 'renderKey')  -->
  <div t-id="TreeComponent">
    <TreeNode
      :node="propsData"
      :handle-add="handleAdd"
      :handle-add-file="handleAddFile"
      :handle-delete-file="handleDeleteFile"
      :key="renderKey"
    ></TreeNode>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";
import { CreateFolder, PushFile, DeleteFile } from "../../dataUtilities";
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

    handleDeleteFile(updatedNode, toBeDeleted) {
      const node = DeleteFile(updatedNode, toBeDeleted);
      this.updateTree(node);
      this.forceRerender();
    },

    updateTree(updatedNode) {
      this.$emit("childCallback", updatedNode, this.$options.name);
    },
    // this is the nifty method I was takling about which increments a counter, which Vue then reacts to triggering a re-render
    forceRerender() {
      this.renderKey += 1;
    },
  },
};
</script>

<style></style>
