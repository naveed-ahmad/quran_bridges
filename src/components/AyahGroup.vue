<template>
  <div class="content row">
    <f7-block-title class="ayah col-100">{{ayahGroupKey}}</f7-block-title>
      <div class="translation col-50">
        <span v-if="loadingTrans" class="text-align-center">Loading...</span>
        <span v-html="translation.text" v-for="(translation) in translations"/>
      </div>

      <div class="ayah col-50">
        <span v-for="(ayah) in ayahGroup">
           {{ayah.textUthmani}}
          <b class="ayah-num">{{ayah.ayahNumber}}</b>
        </span>
      </div>
  </div>
</template>

<script>
  import TranslationModel from '../models/TranslationModel' ;

  import Translation from '../components/Translation';

  export default {
    props: [
      'ayahGroup',
    ],
    components: {
      Translation,
    },
    data () {
      return { loadingTrans: true, translations: [] }
    },
    mounted(){
      const ayahIds = this.ayahGroup.map ( ( ayah ) => ayah.ayahId );
      let that = this;

      return TranslationModel.load ( ayahIds, ( transList ) => {
        that.loadingTrans = false;
        that.translations=transList;
      });
    },
    computed: {
      ayahGroupKey () {
        if (this.ayahGroup.length == 1) {
          return this.ayahGroup[ 0 ].ayahKey;
        }

        return `${this.ayahGroup[ 0 ].ayahKey} - ${this.ayahGroup[ this.ayahGroup.length - 1 ].ayahKey}`;
      }
    }
  }
</script>

<style lang="scss">
  .ayah {
    user-select: text;
    direction: ltr;
    display: block;
    text-align: right;
    padding-right: 10px;
    font-family: me_quran;
    font-size: 20px;
  }
  .md .block{
    margin: 0;
  }
</style>
