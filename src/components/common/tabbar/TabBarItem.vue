<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isShow">
      <slot name="item-icon"></slot>
    </div>
    <div v-show="isShow">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      default: '#d81e06'
    }
  },
  data(){
    return{

    }
  },
  setup(props) {

    const $router = useRouter();
    const $route = useRoute();

    // $router.push({
    //   path: "/"
    // });
    const itemClick = () => {
      // console.log(props.path);
      $router.replace(props.path);
    }

    const isShow = computed(() => $route.path.indexOf(props.path) !== -1);
    const activeStyle = computed(() => $route.path.indexOf(props.path) !== -1 ? {color: props.activeColor} : {});


    return {
      isShow,
      itemClick,
      activeStyle,
    }
  }

}
</script>

<style scoped>

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;

}

.tab-bar-item /deep/ img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}


</style>
