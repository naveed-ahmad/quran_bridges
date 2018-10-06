<template>
  <div class="ayah">
    <f7-block-title>{{ayah.ayahKey}}</f7-block-title>
    <p class="content">{{ayah.text}}</p>
  </div>
</template>

<script>
  export default {
    props: [
      'ayah',
    ],
    computed: {}
  }
</script>

<style lang="scss">
  .ayah {
    user-select: text;
    direction: ltr;
    float: right;
    margin: 10px;
    display: block;
    width: 100%;
    text-align: right;
    padding-right: 10px;
    font-family: me_quran;
    font-size: 20px;
  }
</style>
