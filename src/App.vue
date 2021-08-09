<template>
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="['Detail']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  <MainTabBar></MainTabBar>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MainTabBar from '@components/content/mainTabBar/MainTabBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    MainTabBar
  }
});
</script>

<style>
@import "./assets/css/base.css";
</style>
