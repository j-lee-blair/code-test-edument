<template>
  <div v-if="show" class="split">
    <div class="error-wrapper">
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
  },
};
</script>

<style>
@import "../assets/main.css";
.error-wrapper {
  margin: 1rem 0;
  border: 1px var(--clr-warning-800) solid;
  min-width: 90%;
}

.error {
  position: relative;
  background: var(--clr-warning-300);
  opacity: 0.6;
  min-height: 2rem;
}

.error > p {
  color: var(--clr-dark-800);
}

@media (min-width: 40rem) {
  .error-wrapper {
    min-width: 18rem;
  }
}
</style>
