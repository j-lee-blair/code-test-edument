<template>
  <div v-if="show" class="split" :class="centered ? '' : 'justify-left'">
    <div
      class="error-wrapper"
      :class="marginSmall ? ['topBottomMargin widthSmall'] : ''"
    >
      <div class="error">
        <p>
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorMsg",
  props: {
    message: {
      type: String,
      default: "error",
    },
    show: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    marginSmall: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.error-wrapper {
  font-size: 0.75em;
  margin: 1rem 0;
  border: 1px var(--clr-warning-800) solid;
  min-width: 90%;
}

.topBottomMargin {
  margin: 0.2em 0;
}

.error {
  position: relative;
  background: var(--clr-warning-300);
}

.error > p {
  color: var(--clr-neutral-900);
}

@media (min-width: 40rem) {
  .error-wrapper {
    min-width: 22.75em;
  }
}

.widthSmall {
  min-width: 20.3em;
}
</style>
