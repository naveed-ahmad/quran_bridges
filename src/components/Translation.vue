<template>
  <div class="translation content" v-html="translation.text"/>
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
  .translation{
    padding-left: 10px;
  }

  a.f{
    font-weight: bold;
    font-size: 20px;
    padding: 5px;
  }
</style>
