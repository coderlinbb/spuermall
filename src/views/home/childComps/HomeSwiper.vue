<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners.list">
      <img :src="item.image">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: ['banners'],
  data() {
    return {}
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.my-swipe {
  width: 94%;
  margin: 10px auto;
  border-radius: 10px;
  box-shadow: 0 0 6px #c9c6c6;
  font-size: 0;
}
img {
  width: 100%;
  height: 180px;
  border-radius: 10px;
}
</style>