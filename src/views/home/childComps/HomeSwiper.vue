<template>
  <Swiper>
    <SwiperItem v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script lang="ts">
import {Swiper, SwiperItem} from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  setup(props, {emit}) {
    let isLoad = false;

    const imageLoad = () => {
      if (!isLoad) {
        emit('swiperImageLoad');
        isLoad = true;
      };
    };

    return {
      imageLoad
    }
  }
  // data(){
  //   return{
  //     isLoad: false
  //   }
  // },
  // methods: {
  //   imageLoad(){
  //     if (!this.isLoad){
  //       this.$emit('swiperImageLoad');
  //       this.isLoad = true;
  //     }
  //
  //   }
  // }
}
</script>

<style scoped>

</style>
