<template>
  <div t-id="TreeComponent">{{ propsData }}</div>
</template>

<script>
export default {
  props: {
    propsData: {
      type: String,
      required: false,
    },
  },
  components: {},
};
</script>

<style></style>
