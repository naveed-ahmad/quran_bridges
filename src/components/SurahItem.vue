<template>
  <div class="surah-item" :title="name">
    <h2>TEST</h2>
  </div>
</template>

<script>
  export default {
    props: [
      'surah',
    ],
    computed: {
      name() {
        return "surah name";
      }
    }
  }
</script>
