<template>
  <f7-page
    ptr
    :ptr-distance="30"
    id="home"
  >
    <h2 v-if="loading" class="text-align-center">Loading...</h2>
    <div v-else>
      <f7-toolbar tabbar>
        <f7-link tab-link="#tab-1" tab-link-active>Surah</f7-link>
        <f7-link tab-link="#tab-2">Juz</f7-link>
        <f7-link tab-link="#tab-3">Bookmarks</f7-link>
      </f7-toolbar>

      <f7-tabs animated>
        <f7-tab id="tab-1" class="page-content" tab-active>
          <f7-block>
            <SurahList :surahs="shownSurah"/>
          </f7-block>
        </f7-tab>

        <f7-tab id="tab-2" class="page-content">
          <f7-block>
            <p>Tab 2 content</p>
          </f7-block>
        </f7-tab>
        <f7-tab id="tab-3" class="page-content">
          <f7-block>
            <p>Tab 3 content</p>
          </f7-block>
        </f7-tab>
      </f7-tabs>
    </div>
  </f7-page>
</template>

<script>
  import SurahModel from '../models/SurahModel'

  import SurahList from '../components/SurahList';
  import SurahItem from '../components/SurahItem';

  export default {
    name: 'home',
    components: {
      SurahList,
      SurahItem,
    },
    beforeMount () {
      this.$f7ready ( ( f7 ) => {
        f7.params.title = 'ABC';
        f7.preloader.show ();

        if (! this.pluginInit) {
          this.pluginInit = true;

          let searchbar = f7.searchbar.create ( {
            el: '.searchbar',
            searchContainer: '#searchItems',
            searchIn: '.item-title',
            customSearch: true,
          } );

          searchbar.on ( "enable", this.onSearchEnabled );
          searchbar.on ( "disable", this.onSearchDisabled );
          searchbar.on ( "search", this.onSearch );
        }
      } );
    },
    beforeDestroy () {
      this.pluginInit = false;
    },
    data () {
      return {
        loading: true,
        loadingMore: false,
        showAmount: 114,
        showHome: false,
        totalSurah: 114,
        searchEnabled: false,
        searhcQuery: '',
        showPreloader: false,
        pluginInit: false,
      }
    },
    created () {
    },
    mounted () {
      SurahModel.init ( () => {
        this.loading = false;
        this.$f7.preloader.hide ();
      } );
    },
    computed: {
      searchObjects () {
        if (! this.searchEnabled) return [];
      },
      shownSurah () {
        this.loadingMore = false;
        return SurahModel.load ( this.showAmount );
      }
    },
    methods: {
      searchClicked () {
        this.$f7.searchbar.disable ()

        this.searchEnabled = false;
      },
      refreshThePage () {
        return this.$f7.router.navigate ( "/", { ignoreCache: true } );
      },
      onSearchEnabled () {
        this.searchEnabled = true;
      },
      onSearchDisabled () {
        this.searchEnabled = false;
      },
      onSearch ( sb, query, previousQuery ) {
        this.searhcQuery = query
      }
    }
  }
</script>

<style lang="scss">
  .searchbar-backdrop-in {
    display: none;
  }

  #home {
    .tabs .page-content {
      padding-top: 10px;
    }
  }
</style>
