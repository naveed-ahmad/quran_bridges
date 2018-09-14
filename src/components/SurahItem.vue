<template>
  <f7-list-item :link="url" :header="name" :title="translatedName" class="surah-list">
    <span slot="media" :class="padClass">{{surahNumber}}</span>

    <span slot="after">
      <span :class="surahIconClass"></span>
      <span class="badge">{{surah.ayahCount}}</span>
    </span>

  </f7-list-item>
</template>

<script>
  export default {
    props: [
      'surah',
    ],
    computed: {
      translatedName(){
       return this.surah.enTranslatedName;
      },

      name(){
        return this.surah.nameEnglish;
      },
      nameArabic() {
        return this.surah.nameArabic;
      },
      surahNumber(){
        return this.surah.surahNumber;
      },
      surahIconClass(){
       return `icon-surah${this.surahNumber}`
      },
      url(){
        return `/${this.surahNumber}/`;
      },

      padClass(){
        if(this.surahNumber.length > 2)
          return 'pad-9';
        if(this.surahNumber.length > 1)
          return 'pad-15';

        return 'pad-19';
      }

    }
  }
</script>

<style lang="scss">
  .surah-list{
    .item-media {
      background: url(../assets/images/surah_bg.png);
      background-size: contain;
      background-repeat: no-repeat;
      width: 50px;
      height: 50px;

      span{
        padding-left: 14px;
        font-size: 20px;
      }

      .pad-19{
        padding-left: 19px;
      }

      .pad-15{
        padding-left: 15px;
      }

      .pad-9{
        padding-left: 9px;
      }
    }
  }
</style>
