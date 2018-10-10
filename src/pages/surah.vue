<template>
  <f7-page
    infinite
    ptr
    :infinite-distance="50"
    :infinite-preloader="loadingMore"
    :ptr-distance="30"
    @infinite="handleScroll"
  >
    <div
      id="bismillah"
      className="bismillah text-center word-font"
      title="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
    >
      ﷽
    </div>

    <div v-if="!this.loading">
      <div class="block block-strong" v-for="(ayats) in ayahList">
        <AyahGroup :ayahGroup="ayats"/>
      </div>
    </div>
  </f7-page>
</template>
<script>
  import AyahModel from '../models/AyahModel';
  import FootnoteModel from '../models/FootnoteModel';
  import TranslationModel from '../models/TranslationModel' ;

  import AyahGroup from '../components/AyahGroup';
  //import Translation from '../components/Translation';

  export default {
    name: 'surahPage',
    components: {
      AyahGroup,
      //  Translation,
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
        groupStart: 1, //TODO: think about better names
        groupEnd: 10,
        ayahList: {},
        translationList: {}
      }
    },
    mounted () {
      this.loadData ();
    },
    updated () {
      this.$$ ( "a.f" ).on ( "click", this.showFootnote );
      this.$$ ( "a.sup" ).on ( "click", this.showSuperscript );
    },
    beforeDestroy () {
      this.$$ ( "a.f" ).off ( "click" );
      this.$$ ( "a.sup" ).off ( "click" );

    },
    computed: {
      surahId () {
        return this.$f7route.params.id;
      }
    },
    methods: {
      handleScroll () {
        if (this.loadingMore) {
          this.groupStart = this.groupEnd;
          this.groupEnd += 10;

          this.loadData ();
        }
      },
      loadData () {
        let that = this;
        AyahModel.load ( this.surahId, this.groupStart, this.groupEnd, ( list ) => {
          if (list.length == 0) {
            //No more data to load
            this.loadingMore = false;
          } else {
            list.forEach ( ( ayah ) => {
              if (that.ayahList[ ayah.ayahGroup ] == undefined) {
                that.ayahList[ ayah.ayahGroup ] = []
              }
              that.ayahList[ ayah.ayahGroup ].push ( ayah );
              this.loading = false;
              this.$f7.preloader.hide ();
            } );
          }
        } );
      },
      showFootnote ( e ) {
        e.preventDefault ();
        e.stopPropagation ();
        let that = this;
        FootnoteModel.find ( e.target.getAttribute ( "f" ), function ( footnote ) {
          that.$f7.toast.show ( {
            closeButtonText: '<b>Close</b>',
            text: footnote.text,
            closeButton: true,
            closeTimeout: 10000
          } );
        } );
      },
      showSuperscript ( e ) {
        e.preventDefault ();
        e.stopPropagation ();
        let that = this, supText;
        let text = e.target.textContent;

        if (text == 'pl')
          supText = 'Plural';
        else if (text == 'sg')
          supText = 'Singular';

        if (supText)
          that.$f7.toast.show ( {
            closeButtonText: '<b>Close</b>',
            text: supText,
            closeButton: true,
            closeTimeout: 2000
          } );
      }
    }
  };
</script>


<style lang="scss">
  .page {
    position: fixed;
  }

  .md .toast {
    background: #2196f3 !important;

    .toast-button {
      color: #fff;
    }
  }
</style>
