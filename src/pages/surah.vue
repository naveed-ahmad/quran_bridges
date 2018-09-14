<template>
  <f7-page
    infinite
    ptr
    :infinite-distance="50"
    :infinite-preloader="loadingMore"
    :ptr-distance="30"
    @infinite="handleScroll"
  >
    <f7-block inner>
      <div
        id="bismillah"
        className="bismillah text-center word-font"
        title="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
      >
        ﷽
      </div>
    </f7-block>
    <ul v-if="!this.loading">
      <li v-for="(ayah, index) in ayahList">
        <Ayah :ayah="ayah"/>
        <Translation :translation="translationList[index]"/>
      </li>
    </ul>
  </f7-page>
</template>
<script>
  import AyahModel from '../models/AyahModel'
  import TranslationModel from '../models/TranslationModel'

  import Ayah from '../components/Ayah';
  import Translation from '../components/Translation';

  export default {
    name: 'surahPage',
    components: {
      Ayah,
      Translation,
    },
    beforeMount () {
      this.$f7ready ( ( f7 ) => {
        f7.preloader.show ();
      } );
    },
    data () {
      return {
        loading: true,
        loadingMore: true,
        showAmount: 20,
        ayahList: [],
        translationList: []
      }
    },
    mounted () {
      this.loadData ();
    },
    computed: {
      surahId () {
        return this.$f7route.params.id;
      }
    },
    methods: {
      handleScroll () {
        if (this.loadingMore) {
          this.showAmount += 24;
          this.loadData();
        }
      },
      loadData () {
        AyahModel.load ( this.surahId, this.showAmount, ( list ) => {
          if(list.length < this.showAmount)
            this.loadingMore = false;
          
          this.ayahList = list;
          const ayahIds = this.ayahList.map ( ( ayah ) => ayah.ayahId );

          TranslationModel.load ( ayahIds, ( transList ) => {
            this.translationList = transList;
            this.loading = false;
            this.$f7.preloader.hide ();
          } );
        } );
      }
    }
  };

</script>
