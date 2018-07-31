<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <f7-panel left cover>
      <f7-view url="/panel/left/"></f7-view>
    </f7-panel>

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
        f7params: {
          id: 'com.gameslab.oneHourOneLifeWiki', // App bundle ID
          name: 'One Hour One Life Wiki', // App name
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
