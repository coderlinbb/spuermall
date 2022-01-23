<template>
    <div class="detail">
        <detail-nav-bar ref="navbar" class="nav-bar" @titleClick="titleClick"></detail-nav-bar>
        <scroll ref="scroll" class="wrapper" :listenScroll="true" @scroll="scroll">
            <!--   轮播图     -->
            <detail-swiper :swiperImages="swiperImages"></detail-swiper>
            <!--    商品简要描述      -->
            <detail-describe :describe="describe"></detail-describe>
            <!--    商店简要信息      -->
            <detail-shop-info :shop="shop"></detail-shop-info>
            <!--    商品信息  这里刷新滚动通过计数器和@load实现    -->
            <detail-goods-info :detailInfo="detailInfo" @refreshScroll="refreshScroll"></detail-goods-info>
            <!--    商品参数      -->
            <detail-goods-params ref="params" :goodsParams="goodsParams"></detail-goods-params>
            <!--    商品评论      -->
            <detail-comments ref="comments" :goodsComments="goodsComments"></detail-comments>
            <!--    商品推荐  这里刷新滚动通过防抖实现    -->
            <div class="title">好物推荐</div>
            <goods-list ref="recommends" @detailImageLoad="detailImageLoad" :goods="recommends"></goods-list>
        </scroll>
        <detail-tab-bar @addToCart="addToCart" @setCollect="setCollect"></detail-tab-bar>
        <back-top v-if="showBackTop" @click.native="toTop"></back-top>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import {getDetail, getRecommend} from "../../network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailDescribe from "./childComps/DetailDescribe";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "../../components/content/Scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailGoodsParams from "./childComps/DetailGoodsParams";
    import DetailComments from "./childComps/DetailComments";
    import GoodsList from "../../components/content/goods/GoodsList";
    import {debounce} from "../../common/utils";
    import DetailTabBar from "./childComps/DetailTabBar";
    import BackTop from "../../components/content/backTop/BackTop";
    import {Toast} from 'vant'

    export default {
        name: "Detail",
        components: {
            BackTop,
            DetailTabBar,
            GoodsList,
            DetailComments,
            DetailGoodsParams,
            DetailGoodsInfo,
            Scroll,
            DetailShopInfo,
            DetailDescribe,
            DetailSwiper,
            DetailNavBar
        },
        data() {
            return {
                swiperImages: [],
                describe: {},
                shop: {},
                detailInfo: {},
                goodsParams: {},
                goodsComments: {},
                recommends: {},
                offsetY: [],
                getOffsetY:null,
                showBackTop:false
            }
        },
        updated() {
            this.$refs.scroll.refresh();
        },
        methods: {
            getDetail() {
                // console.log(this.$route.query.id);
                getDetail(this.$route.query.id).then(res => {
                    console.log(res);
                    //轮播图
                    this.swiperImages = res.result.itemInfo.topImages;
                    //商品描述
                    this.$set(this.describe, 'title', res.result.itemInfo.title);
                    this.$set(this.describe, 'desc', res.result.itemInfo.desc);
                    this.$set(this.describe, 'newPrice', res.result.itemInfo.price);
                    this.$set(this.describe, 'oldPrice', res.result.itemInfo.oldPrice);
                    this.$set(this.describe, 'discount', res.result.itemInfo.discountDesc);
                    this.$set(this.describe, 'columns', res.result.columns);
                    this.$set(this.describe, 'services', res.result.shopInfo.services);
                    this.$set(this.describe, 'realPrice', res.result.itemInfo.lowNowPrice);
                    //店铺详情
                    this.$set(this.shop, 'logo', res.result.shopInfo.shopLogo);
                    this.$set(this.shop, 'name', res.result.shopInfo.name);
                    this.$set(this.shop, 'fans', res.result.shopInfo.cFans);
                    this.$set(this.shop, 'sells', res.result.shopInfo.cSells);
                    this.$set(this.shop, 'score', res.result.shopInfo.score);
                    this.$set(this.shop, 'goodsCount', res.result.shopInfo.cGoods);
                    //商品详情
                    this.detailInfo = res.result.detailInfo;
                    //商品参数
                    this.$set(this.goodsParams, 'image', res.result.itemParams.info.images ? info.images[0] : '');
                    this.$set(this.goodsParams, 'infos', res.result.itemParams.info.set);
                    this.$set(this.goodsParams, 'sizes', res.result.itemParams.rule.tables);
                    //商品评论
                    this.$set(this.goodsComments, 'count', res.result.rate.cRate);
                        //这里后端只有1条数据
                    if (res.result.rate.cRate != 0)
                        this.$set(this.goodsComments, 'list', res.result.rate.list[0]);
                });
            },
            getRecommend() {
                getRecommend().then(res => {
                    // console.log(res);
                    this.recommends = res.data.list;
                })
            },
            refreshScroll() {
                this.$refs.scroll.refresh();
            },
            titleClick(index) {
                // console.log('点击了'+index);
                switch (index) {
                    case 0:
                        this.$refs.scroll.scrollTo(0, 0, 500);
                        break;
                    case 1:
                        //可能会有无参数的商品，直接跳转到评论即可
                        if(this.offsetY[1]){
                            this.$refs.scroll.scrollToElement('.goods-params', 500, false, -10);
                            break;
                        }
                    case 2:
                        this.$refs.scroll.scrollToElement('.comments', 500, false, -10);
                        break;
                    case 3:
                        this.$refs.scroll.scrollToElement('.goods-list', 500, false, -30);
                        break;
                }
            },
            scroll(pos) {
                // console.log(pos);
                for (let i = 0; i < this.offsetY.length; i++) {
                    //这里减去的值（20 40)是因为上面scrollToElement的时候有偏移量
                    if (i != this.offsetY.length - 1) {//防止i+1溢出
                        //currentIndex!=i进行了优化
                        if (this.$refs.navbar.currentIndex !== i && (-pos.y > this.offsetY[i] - 20 && -pos.y < this.offsetY[i + 1] - 20)) {
                            // console.log(i)
                            this.$refs.navbar.currentIndex = i;
                        }
                    } else {//i===length-1
                        if (this.$refs.navbar.currentIndex !== i && -pos.y > this.offsetY[i] - 40) {
                            // console.log(i)
                            this.$refs.navbar.currentIndex = i;
                        }
                    }
                }

                if(pos.y<-200){//展示回到顶部按钮
                    this.showBackTop = true;
                }
                else this.showBackTop = false;
            },
            detailImageLoad(){
                // console.log('---');
                this.getOffsetY();
            },
            toTop(){
                this.$refs.scroll.scrollTo(0,0,500);
            },
            addToCart(){
                let info = {};
                info.id = this.$route.query.id;
                info.image = this.swiperImages[0];
                info.title = this.describe.title;
                info.desc = this.describe.desc;
                info.price = this.describe.realPrice;
                info.num = 1;
                info.checked = false//用于全选框

                // this.$store.cartList.push(info);
                this.$store.commit('addToCart',info)
                Toast({
                    message:'加入购物车成功',
                    icon:'success',
                    position:'middle',
                    duration:800
                })
            },
            setCollect(){
                if (this.$store.state.collectList.findIndex(item => item.id == this.$route.query.id) != -1) {
                    Toast.success('取消收藏成功')
                } else Toast.success('收藏成功')
                this.isCollect = !this.isCollect;
                let info = {};
                info.id = this.$route.query.id;
                info.image = this.swiperImages[0];
                info.title = this.describe.title;
                info.price = this.describe.realPrice;
                this.$store.commit('setCollect', info);
            }
        },
        created() {
            this.getDetail();
            this.getRecommend();
            this.getOffsetY = debounce(()=>{
                this.offsetY = [];
                this.offsetY.push(0);
                this.offsetY.push(this.$refs.params.$el.offsetTop);
                this.offsetY.push(this.$refs.comments.$el.offsetTop);
                this.offsetY.push(this.$refs.recommends.$el.offsetTop);
                console.log(this.offsetY);
            },50);
        },
        watch: {
            $route() {
                console.log('route改变了')
                this.getDetail();
                this.getRecommend();
                this.$router.go(0);
            },

        }
    }
</script>

<style scoped>
    @import "~assets/css/views/Detail/detail.css";

    .nav-bar {
        background-color: #fff;
    }

    .wrapper {
        /*height: calc(100% - 93px);*/
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .title {
        padding: 10px 20px 0;
        font-weight: bold;
    }
</style>