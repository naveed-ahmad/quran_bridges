<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <f7-panel left cover>
      <f7-view url="/panel/left/"></f7-view>
    </f7-panel>

    <f7-navbar sliding>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fa fa-bars"></f7-link>
      </f7-nav-left>

      <f7-link href="/" v-if="showHome"><i class="icon fa fa-home"></i></f7-link>

      <div class="title">
        {{pageTitle}}
      </div>

      <f7-nav-right>
        <f7-link class="searchbar-enable" data-searchbar=".searchbar-components" icon="fa fa-search"></f7-link>
      </f7-nav-right>

      <f7-searchbar class="searchbar-components" search-item="li" search-container=".simple-listss"
                    search-in="item-text" :custom-search="true"
                    expandable data-open-in='sheet'></f7-searchbar>
    </f7-navbar>
    
    <!-- Main View -->
    <f7-view url="/" id="main-view" class="ios-edges" main></f7-view>
  </f7-app>
</template>

<script>
  // Import Routes
  import routes from './routes.js'
  let theme = 'auto';
  export default {
    data() {
      return {
        // Framework7 parameters here
        showHome: false,
        pageTitle: 'The Quran Bridges--',
        f7params: {
          id: 'com.thequranbridges', // App bundle ID
          name: 'The Quran Bridges', // App name
          title: 'The Quran Bridges',
          // App routes
          routes: routes,
          // Automatic theme detection
          theme
        },
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .md .page{
    margin-top: -10px;
  }
  .md .navbar ~ * .page-content, .md .navbar ~ .page-content{
    padding-top: 0px;
  }


</style>
