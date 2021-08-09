<template>

  <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
    <van-swipe-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </van-swipe-item>
  </van-swipe>

</template>


<script>

export default {
  name: "Swiper",
  props:{
    banners:{
      type : Array,
      required: true
    }
  },
  data(){
    return{
      isLoad: false
    }
  },
  methods: {
    imageLoad(){
      if (!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }

    }
  }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
