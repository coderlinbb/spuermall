<template>
  <div class="home">
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" :class="{'fixed':isFixed}" v-show="isFixed"></tab-control>
    <Scroll ref="scroll" class="wrapper" :listenScroll="true" @scroll="scroll" :pullup="true" @scrollToEnd="scrollToEnd">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </Scroll>
    <back-top v-if="showBackTop" @click.native="toTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import FeatureView from './childComps/FeatureView'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/content/Scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'

export default {
  name: 'Home',
  components: { BackTop, Scroll, GoodsList, TabControl, FeatureView, RecommendView, HomeSwiper, NavBar },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop', //默认pop
      showBackTop: false, //展示回到顶部按钮
      tabControlOffsetTop: '', //获取TabControl的offsetTop,用于吸顶
      isFixed: false //判断是否吸顶
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // console.log(this.tabControlOffsetTop==false);
  },
  mounted() {},
  updated() {
    if (!this.tabControlOffsetTop) {
      //获取tabcontrol高度
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabControlOffsetTop);
    }
  },
  methods: {
    //获取轮播图和推荐好物
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner
        this.recommends = res.data.recommend
      })
    },
    //获取商品信息 （分页和获取数据）
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        this.$refs.scroll.refresh()
      })
    },
    //切换tabControl
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          this.$refs.scroll.refresh()
          break
        case 1:
          this.currentType = 'new'
          this.$refs.scroll.refresh()
          break
        case 2:
          this.currentType = 'sell'
          this.$refs.scroll.refresh()
          break
      }
    },
    //回到顶部
    toTop() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    scroll(pos) {
      //滚动监听
      // console.log(pos.y);
      if (pos.y < -200) {
        //展示回到顶部按钮
        this.showBackTop = true
      } else this.showBackTop = false

      this.isFixed = pos.y < -this.tabControlOffsetTop ? true : false //吸顶效果
    },
    //上拉加载
    scrollToEnd() {
      this.getHomeGoods(this.currentType)
    }
  }
}
</script>

<style scoped>
@import '~assets/css/views/Home/home.css';
.home {
  padding-top: 44px;
}
.home_nav {
  background-color: var(--color-tint);
  color: white;
  font-weight: bold;
}
.wrapper {
  /*height: calc(100% - 93px);*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>