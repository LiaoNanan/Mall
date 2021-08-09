<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" :key="showImage">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {computed} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      required: true
    }

  },
  setup: function (props) {

    const $router = useRouter();

    const showImage = computed(() => props.goodsItem.image || props.goodsItem.show.img);

    const imageLoad = () => {};

    const itemClick = () => $router.push('/detail/' + props.goodsItem.iid);

    return {
      showImage,
      itemClick,
      imageLoad
    }
  }
  // computed:{
  //   showImage(){
  //     return this.goodsItem.image || this.goodsItem.show.img;
  //   }
  // },
  //
  // methods:{
  //   imageLoad(){
  //   },
  //   itemClick(){
  //     this.$router.push('/detail/' + this.goodsItem.iid);
  //   }
  // }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~@assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
