<template>
  <div class="loader">
    <q-spinner color="primary" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  .q-spinner {
    position: fixed;
    top: calc(50% - 62px);
    left: calc(50% - 62px);
    font-size: 124px;
  }
}
</style>