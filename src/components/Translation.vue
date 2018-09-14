<template>
    <div>
      <span v-html="translation.text" />
    </div>
</template>

<script>
  export default {
    props: [
      'translation',
    ],
    computed: {
    }
  }
</script>

<style lang="scss">
  .h{
    color: #c0392b;
  }
</style>
