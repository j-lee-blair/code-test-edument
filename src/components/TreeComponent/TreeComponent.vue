<template>
  <div t-id="TreeComponent">
    <TreeNode :node="propsData"></TreeNode>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";
export default {
  props: {
    propsData: {
      type: Object,
    },
  },
  components: {
    TreeNode,
  },
};
</script>

<style></style>
