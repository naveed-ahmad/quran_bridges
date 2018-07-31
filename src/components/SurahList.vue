<template>
  <f7-list medial-list>
    <ul>
      <SurahItem :surah="surah" v-for="surah in surahs"/>
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

