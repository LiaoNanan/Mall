<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl_top"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @contentScroll="contentScroll" @pullingUp="pullingUp">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommend"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>

    <back-top @click="backClick" v-show="isShowBackTop"></back-top>


  </div>
</template>

<script lang="ts">
import NavBar from "@/components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView.vue";
import HomeFeatureView from "@/views/home/childComps/HomeFeatureView.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
// import BackTop from "@/components/content/backTop/BackTop.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";

import {getHomeMultidata, getHomeGoods} from "@/network/home.ts";
import {backTopMixin} from "@/common/mixin.ts"


export default {
  name: "Home",
  mixins: [backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  data() {
    return {
      banners: [],
      recommend: [],
      currentType: 'pop',
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');


  },
  mounted() {
    this.$refs.tabControl.$el.offsetTop

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },


  },
  activated() {
    // console.log(this.saveY);
    this.$refs.scroll.scrollTo(0, this.saveY, 5);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log(this.$refs.scroll.scroll.y);
    this.saveY = this.$refs.scroll.scroll.y;
    // console.log(this.saveY);
  },

  methods: {

    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl_top.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res.data.recommend);
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })

    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        // console.log(res.data);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
        // console.log(this.$refs.scroll.scroll)
        // this.$refs.scroll.scroll.refresh()
      })
    },


    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;

      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    // backClick(){
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },

    pullingUp() {
      this.getHomeGoods(this.currentType);
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;

  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}


.tab-control {
  position: relative;
  /*top: 44px;*/
  z-index: 9;
}

/*.fixed {*/
/*  position: fixed;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top: 44px;*/
/*}*/

.content {
  /*height: calc(100% - 49px);*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
