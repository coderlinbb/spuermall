<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends.list">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: ['recommends']
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    margin-top: 10px;
    font-size: 13px;
    padding: 10px 10px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }
  .recommend img {
    width: 64px;
    height: 64px;
    padding:2px 2px;
    border-radius: 50%;
    background-color: #ffdadc;
    margin-bottom: 6px;
  }
</style>