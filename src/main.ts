import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import lazyPlugin from 'vue3-lazy';
// import "amfe-flexible";

import {Icon, Swipe, SwipeItem} from 'vant';


createApp(App)
  .use(router)
  .use(store)
  .use(lazyPlugin, {
    loading: require("@assets/img/common/placeholder.png"), // 图片加载时默认图片
    error: require('@assets/img/common/placeholder.png')// 图片加载失败时默认图片
  })
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .mount('#app')
