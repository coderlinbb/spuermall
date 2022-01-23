<template>
  <div id="app">
    <keep-alive include="Home"><router-view></router-view></keep-alive>
    <main-tab-bar
            v-if="$route.path!='/detail'&&$route.path!='/pay'
                  &&$route.path!='/address'&&$route.path!='/addressedit'
                  &&$route.path!='/order'
                  &&$route.path!='/collection'"></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from "./components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {MainTabBar},
}
</script>

<style>
  @import "assets/css/base.css";
</style>
