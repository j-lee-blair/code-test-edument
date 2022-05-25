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
    handleAdd(updatedNode, inputIsValid, newNodeLabel, parentKey) {
      console.log(
        "TreeComponent::handleAdd:: ",
        JSON.stringify(updatedNode),
        newNodeLabel,
        parentKey
      );
      if (inputIsValid) {
        const { node, parent } = CreateFolder(
          updatedNode,
          newNodeLabel,
          parentKey
        );
        console.log("updatedNode: ", JSON.stringify(node));
        this.updateTree(node, parent);
        //this.inputError = false;
        this.newEntry = "";
        this.forceRerender();
      } else {
        console.log("invalid input");
        //TODO: handle else
      }
    },
    updateTree(updatedNode, parentKey) {
      //console.log("TreeComponent listenener", updatedNode, parentKey);
      this.$emit("childCallback", updatedNode, this.$options.name, parentKey);
    },
    forceRerender() {
      this.renderKey += 1;
    },
    // inputIsValid() {
    //   this.inputError =
    //     Object.keys(this.node.folders).indexOf(this.inputData) === -1 &&
    //     this.inputData !== "";
    //   return this.inputError;
    // },
  },
};
</script>

<style></style>
