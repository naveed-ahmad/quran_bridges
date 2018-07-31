<template>
  <f7-page>
    <f7-block-title>
      Menu
      <f7-link panel-close class="pull-right">
        <i class="fa fa-times-circle"></i>
      </f7-link>
    </f7-block-title>

    <f7-list>
      <f7-list-item link="/" title="Home" view="#main-view" panel-close>
        <i class="fa fa-home"></i>
      </f7-list-item>

      <f7-list-item link="/videos/" title="Videos" view="#main-view" panel-close>
        <i class="fa fa-play-circle"></i>
      </f7-list-item>

      <f7-list-item link="/page/about/" title="About" view="#main-view" panel-close>
        <i class="fa fa-info-circle"></i>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
  };
</script>
