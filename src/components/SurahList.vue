<template>
  <f7-list medial-list id="surah-list-wrapper">
    <ul>
      <SurahItem :surah="surah" v-for="surah in surahs" />
    </ul>
  </f7-list>
</template>

<script>
  import SurahItem from '../components/SurahItem';

  export default {
    props: [
      'surahs',
    ],
    components: {
      SurahItem,
    }
  }
</script>
<style class="css">
  #surah-list-wrapper{
    margin: 10px 0;
  }
</style>

