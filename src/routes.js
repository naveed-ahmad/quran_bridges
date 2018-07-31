import Home from './pages/home.vue';
import Videos from './pages/videos.vue';
import SurahPage from './pages/surah.vue';
import LeftPanel from './pages/panel-left';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/videos',
    component: Videos
  },
  {
    path: '/page/videos/:id',
    component: Videos
  },
  {
    path: '/panel/left/',
    component: LeftPanel
  },
  {
    path: "/:id/",
    component: SurahPage
  }
]
