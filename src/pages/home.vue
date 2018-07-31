<template>
  <f7-page
    infinite
    ptr
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    :ptr-distance="30"
    @infinite="handleScroll"
  >
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fa fa-bars"></f7-link>
      </f7-nav-left>

      <f7-link href="/" v-if="showHome"><i class="icon fa fa-home"></i></f7-link>

      <div class="title">
        {{this.title}}
      </div>

      <f7-nav-right>
        <f7-link class="searchbar-enable" data-searchbar=".searchbar-components" icon="fa fa-search"></f7-link>
      </f7-nav-right>

      <f7-searchbar class="searchbar-components" search-item="li" search-container=".simple-listss"
                    search-in="item-text" :custom-search="true"
                    expandable data-open-in='sheet'></f7-searchbar>
    </f7-navbar>

    <h2 v-if="loading" class="text-align-center">Loading...</h2>
    <div v-else>
      <div class="infinite-scroll-content">
        <div class="surah-list" id="surah-list">
          <div class="surah-item" v-for="surah in shownSurah">
            <SurahItem :surah="surah"/>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
  import Surah from '../models/surah'

  import SurahItem from '../components/SurahItem';

  export default {
    name: 'home',
    components: {
      SurahItem,
    },
    mounted () {
      this.$f7ready ( ( f7 ) => {
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
      });
    },
    beforeDestroy () {
      this.pluginInit = false;
    },
    data () {
      return {
        loading: true,
        loadingMore: false,
        showAmount: 24,
        showHome: false,
        totalSurah: 114,
        title: 'The Bridges Quran',
        searchEnabled: false,
        searhcQuery: '',
        showPreloader: true,
        pluginInit: false
      }
    },
    created () {
    },
    beforeMount () {
      Surah.init ( () => {
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
        return Surah.load ( this.showAmount );
      }
    },
    methods: {
      searchClicked () {
        this.$f7.searchbar.disable ()

        this.searchEnabled = false;
      },
      handleScroll () {
        if (this.showAmount < this.totalObjects) {
          if (! this.loadingMore) {
            this.loadingMore = true;
            this.showAmount += 24;

            if (this.showAmount > this.totalObjects) {
              this.showPreloader = false;
            }
          }
        }
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
</style>
