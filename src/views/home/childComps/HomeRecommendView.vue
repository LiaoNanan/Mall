<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>
<script>
export default{
  name:'RecommendView',
  props:{
    recommends:{
      type:Array,
      required: true
    }

  }
}
</script>
<style type="text/css">
.recommend{
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 10px 0 25px 0;
  border-bottom: 6px solid #d4d4d4;
}
.recommend-item a{
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recommend-item a p{
  margin-top: 8px;
  font-size: 14px;
}
.recommend-item a:link{
  text-decoration: none;
}
.recommend-item img{
  width: 70px;
  height: 70px;
}
</style>
