<template>
  <f7-page
    infinite
    ptr
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    :ptr-distance="30"
    @infinite="handleScroll"
    id="home"
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
      <f7-toolbar tabbar>
        <f7-link tab-link="#tab-1" tab-link-active>Surah</f7-link>
        <f7-link tab-link="#tab-2">Juzz</f7-link>
        <f7-link tab-link="#tab-3">Bookmarks</f7-link>
      </f7-toolbar>

      <f7-tabs animated>
        <f7-tab id="tab-1" class="page-content" tab-active>

          <div class="infinite-scroll-content">
            <SurahList :surahs="shownSurah"/>
          </div>
        </f7-tab>
        <f7-tab id="tab-2" class="page-content">
          <f7-block>
            <p>Tab 2 content</p>
            <div class="infinite-scroll-content">
              <div class="surah-list" id="surah-list2">
                <div class="surah-item" v-for="surah in shownSurah">
                  <SurahItem :surah="surah"/>
                </div>
              </div>
            </div>
          </f7-block>
        </f7-tab>
        <f7-tab id="tab-3" class="page-content">
          <f7-block>
            <p>Tab 3 content</p>
            <div class="infinite-scroll-content">
              <div class="surah-list" id="surah-list3">
                <div class="surah-item" v-for="surah in shownSurah">
                  <SurahItem :surah="surah"/>
                </div>
              </div>
            </div>
          </f7-block>
        </f7-tab>
      </f7-tabs>
    </div>
  </f7-page>
</template>

<script>
  import Surah from '../models/surah'

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
        showAmount: 114,
        showHome: false,
        totalSurah: 114,
        title: 'The Bridges Quran',
        searchEnabled: false,
        searhcQuery: '',
        showPreloader: false,
        pluginInit: false
      }
    },
    created () {
    },
    mounted () {
      Surah.init ( () => {
        this.loading = false;
        this.$f7.preloader.hide ();
      });
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
        if (this.showAmount < this.totalSurah) {
          if (! this.loadingMore) {
            this.loadingMore = true;
            this.showAmount += 24;

            if (this.showAmount > this.totalSurah) {
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

  #home{
    .tabs .page-content{
      padding-top: 10px;
    }
  }

</style>
