<template>
  <f7-page>
    <f7-navbar title="Videos" back-link="Back" sliding></f7-navbar>

    <div v-if="singleVideo">
      <f7-block-title>
        {{title}}
      </f7-block-title>

      <p class="text-align-center">
        <youtube :video-id="singleVideo">
        </youtube>
      </p>
    </div>

    <div v-else>
      <f7-block-title>
        Play list
      </f7-block-title>


      <f7-list>
        <li class="item-content item-input" v-for="video in videos">
          <f7-link @click="videoClicked" :href="url(video)">
            <div class="item-inner">
              <div class="item-title item-label">
                {{video.title}}
              </div>
            </div>
          </f7-link>
        </li>

      </f7-list>
    </div>


  </f7-page>
</template>
<script>
  export default {
    data () {
      return {
        videos: [
          {
            id: 'S-WwZqr6LBg',
            title: 'How to ponder the Quran even if you don\'t know Arabic workshop | part 1'
          }
        ],
        title: "Videos"
      }
    },
    methods: {
      url ( video ) {
        return `/page/videos/${video.id}/`;
      },

    },
    computed: {
      singleVideo () {
        return this.$f7route.params.id;
      }
    }

  };
</script>


