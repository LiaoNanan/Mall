<template>
  <div class="goods">
    <GoodsListItem v-for="(item, index) in goods" :key="index" :goods-item="item"></GoodsListItem>
  </div>
</template>

<script lang="ts">
import GoodsListItem from "@/components/content/goods/GoodsListItem.vue";
export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /*padding: 1px;*/
}
</style>
