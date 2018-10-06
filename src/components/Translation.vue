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
    mounted(){
    },
    computed: {

    },
    methods: {
    }
  }
</script>

<style lang="scss">
  .h{
    color: #c0392b;
  }
</style>
