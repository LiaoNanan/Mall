<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index"
         class="tab-control-item" :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      required: true
    }
  },
  setup(props, {emit}) {
    const currentIndex = ref(0);

    const itemClick = index => {
      currentIndex.value = index;
      emit("tabClick", index);
    };

    return {
      currentIndex,
      itemClick
    }
  }
  // data(){
  //   return {
  //     currentIndex: 0
  //   }
  // },
  // methods: {
  //   itemClick(index){
  //     this.currentIndex = index;
  //     this.$emit("tabClick", index);
  //   }
  // }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;

}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-high-text);
}

</style>
