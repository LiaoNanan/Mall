<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import BScroll from 'better-scroll'
import {onMounted, ref} from "vue";
// import BScroll from '@better-scroll/core'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const wrapper = ref(null);
    let scroll;

    onMounted(() => {
      scroll = new BScroll(wrapper.value, {
        observeDOM: true,
        observeImage: true,
        disableTouch: false,
        scrollY: true,
        click: true,
        probeType: props.probeType,
        pullUpLoad: props.pullUpLoad
      });

      if (props.probeType > 1) scroll.on('scroll', position => emit('contentScroll', position));

      if (props.pullUpLoad) scroll.on('pullingUp', () => emit('pullingUp'));
    });

    const scrollTo = (x = 0, y = 0, time = 500) => scroll && scroll.scrollTo(x, y, time);

    const finishPullUp = () => scroll.finishPullUp();

    const refresh = () => scroll && scroll.refresh();

    return {
      wrapper,
      scrollTo,
      finishPullUp,
      refresh
    }
  }
  // data() {
  //   return {
  //     scroll: null
  //   }
  // },
  // mounted() {
  //   // setTimeout(()=>{
  //     this.scroll = new BScroll(this.$refs.wrapper, {
  //       observeDOM:true,
  //       observeImage:true,
  //       disableTouch: false,
  //       scrollY: true,
  //       click: true,
  //
  //       probeType: this.probeType,
  //       pullUpLoad: this.pullUpLoad,
  //     })
  //   // },500);
  //   // setTimeout(()=>{
  //   //   this.scroll.refresh();
  //   // //   // console.log(this.scroll);
  //   //
  //   // },500)
  //
  //   if(this.probeType > 1){
  //     this.scroll.on('scroll', (position) => {
  //       // console.log(position);
  //       this.$emit('contentScroll', position);
  //     })
  //   }
  //
  //   if(this.pullUpLoad){
  //     this.scroll.on('pullingUp', () => {
  //       this.$emit('pullingUp')
  //     })
  //   }
  // },
  // methods:{
  //   scrollTo(x = 0, y = 0, time = 500){
  //     this.scroll && this.scroll.scrollTo(x,y,time);
  //   },
  //
  //   finishPullUp(){
  //     this.scroll.finishPullUp();
  //   },
  //
  //   refresh(){
  //     this.scroll && this.scroll.refresh();
  //   }
  //
  // }
}
</script>

<style scoped>
</style>
