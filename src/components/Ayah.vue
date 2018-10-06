<template>
  <div>
    <span class="ayah">{{ayah.text}}</span>
  </div>
</template>

<script>
  export default {
    props: [
      'ayah',
    ],
    computed: {
    }
  }
</script>

<style lang="scss">
  .ayah{
    user-select: text;
  }
</style>
