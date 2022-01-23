<template>
    <div class="detail-tab-bar">
        <div class="bar-left">
            <div class="left-item service">
                <div class="img"><img src="~assets/img/detail/service.png"></div>
                <div>客服</div>
            </div>
            <div class="left-item shop">
                <div class="img"><img src="~assets/img/detail/shop.png"></div>
                <div>店铺</div>
            </div>
            <div class="left-item collect" @click="setCollect">
                <div class="img" v-show="!isCollect"><img src="~assets/img/detail/collect.png"></div>
                <div v-show="!isCollect">收藏</div>
                <div v-show="isCollect" class="img"><img src="~assets/img/detail/collect_active.png"></div>
                <div v-show="isCollect">已收藏</div>
            </div>

        </div>
        <div class="bar-right">
            <div class="right-item shopcart" @click="addToCart">加入购物车</div>
            <div class="right-item buy" @click="toCart">购买</div>
        </div>
    </div>
</template>

<script>
    import {Toast} from "vant";

    export default {
        name: "DetailTabBar",
        data(){
            return{
                isCollect:false
            }
        },
        methods:{
            addToCart(){
                this.$emit('addToCart')
            },
            toCart(){
                this.$router.push('/cart');
            },
            setCollect(){
                this.$emit('setCollect');
                this.isCollect = !this.isCollect;
            }
        },
        created() {
            if(this.$store.state.collectList.findIndex(item=>item.id==this.$route.query.id)!=-1){
                this.isCollect = true;
            }
        }
    }
</script>

<style scoped>
    img{
        width: 22px;
        height: 22px;
        vertical-align: middle;
    }
    .detail-tab-bar{
        height: 49px;
        position: absolute;
        bottom:0;
        left: 0;
        right: 0;
        font-size: 14px;
        color:#fff;
        background-color: #fff;
        display: flex;
        border-top:1px solid #eeeeee;
    }
    .bar-left,.bar-right{
        flex:1;
        display: flex;
    }
    .left-item,.right-item{
        flex:1;
        text-align: center;
    }
    .left-item{
        background-color: #f8f8f8;
        color:#676767;
        line-height:24.5px;
    }
    .left-item .img{
        line-height: 26px;

    }
    .right-item{
        line-height: 49px;
    }
    .left-item.service{
    }
    .left-item.shop{
        border-left: 1px solid #ececec;
        border-right: 1px solid #ececec;
    }
    .right-item.shopcart{
        background-color: #f8ff4a;
        color: #676767;
    }
    .right-item.buy{
        background-color: #ff9799;
    }
</style>