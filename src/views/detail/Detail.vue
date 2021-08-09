<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @contentScroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>


      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :is-show="show"/>

  </div>

</template>

<script>
import DetailNavBar from "@views/detail/childComps/DetailNavBar";
import DetailSwiper from "@views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@views/detail/childComps/DetailBottomBar";

import Scroll from "@components/common/scroll/Scroll";
import Toast from "@components/common/toast/Toast";
import GoodsList from "@components/content/goods/GoodsList";


import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@network/detail";
import {debounce} from "@common/utils";
import {backTopMixin} from "@common/mixin.ts"
import {mapActions} from "vuex";


export default {
  name: "Detail",
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: '商品成功添加到购物车',
      show: false
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取数据
      const data = res.result;
      // console.log(data);
      // 2.取出顶部轮播图的数据
      this.topImages = res.result.itemInfo.topImages
      // 3.创建商品的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 5.取出商品详细信息
      this.detailInfo = data.detailInfo
      // 6.取出参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 7.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    })

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeBottomYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44);
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44);
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44);

      this.themeTopYs.push(Number.MIN_SAFE_INTEGER);//method：contentScroll()方法二优化
      // console.log(this.themeTopYs);
    }, 500)
  },
  methods: {
    ...mapActions(['addCart']),

    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopY();
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 500);
    },

    contentScroll(position) { // 功能：使滚动到的内容在顶上显示对应标题
      if (this.$route.path.indexOf("detail") !== -1) {
        //判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000;

        // 1.获取Y值
        const positionY = position.y;
        // console.log(position.y);
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          if ((positionY <= this.themeTopYs[i] && positionY > this.themeTopYs[i + 1])) {
            // console.log(i);
            // console.log(position.y);
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      }

    },
    addToCart() { //点击添加到购物车
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.realPrice = this.goods.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.addCart(product).then(res => {
        console.log(res);
        this.show = true;
        setTimeout(() => {
          this.show = false
        }, 1000)
        // this.$toast.show(res, 1000)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    },
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>
