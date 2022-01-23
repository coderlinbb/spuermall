<template>
    <div class="sum-order">
        <nav-bar>
            <div slot="left" @click="backClick">
                <img src="~assets/img/common/back_white.png">
            </div>
            <div slot="center">我的订单</div>
        </nav-bar>
        <div class="navOrder">
            <div :class="{item:true,con:index==navIndex}"
                 @click="changeIndex(index)"
                 v-for="(item,index) in navOptions" :key="index">
                {{item}}
            </div>
        </div>
        <!-- 订单显示 -->
        <scroll ref="scroll" class="wrapper">
            <div class="orderList">
                <div class="order" v-if="item.type == navIndex||navIndex == 0"
                     v-for="(item,index) in $store.state.order" :key="item.orderId">
                    <div class="h1">
                        <span>订单id:{{item.orderId}}</span>
                        <span class="type">{{navOptions[item.type]}}</span>
                    </div>
                    <div class="goodslist" v-for="value in item.orderList"
                         :key="value.id">
                        <div class="goodsleft">
                            <img :src="value.image">
                        </div>
                        <div class="goodsright">
                            <div class="goods-name">
                                <span>{{value.title}}</span>
                            </div>
                            <div class="goods-num">
                                <div class="num">x{{value.num}}</div>
                            </div>
                            <div class="goods-price">
                                <span>￥{{value.price}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="fl">
                            <span>总价格：</span>
                            <span class="price">￥{{item.total}}</span>
                        </div>
                        <div class="fr">
                            <div class="btn" v-if="$store.state.order[index].type!=4" @click="changeOrderType(index)">
                                {{btnText[item.type-1]}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import Scroll from "../../components/content/Scroll/Scroll";

    export default {
        name: "Order",
        components: {Scroll, NavBar},
        data() {
            return {
                navIndex: 0,
                navOptions: ['全部订单', '待支付', '待发货', '待收货', '已完成'],
                btnText: ['付款','商家已发货?', '确认收货']
            }
        },
        methods: {
            backClick() {
                this.$router.go(-1);
            },
            changeIndex(index) {
                this.navIndex = index;
            },
            changeOrderType(index){
                //index表示的是第index份订单
                this.$store.commit('changeOrderType',index)
            }
        },
         created() {
            if(this.$route.params.index){
                //如果从个人中心跳转到订单页面，则需要修改navIndex
                this.changeIndex(this.$route.params.index);
            }
         }
    }
</script>

<style scoped>
    @import "~assets/css/views/Order/order.css";
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: bold;
    }

    .left img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }

    .navOrder {
        position: fixed;
        left: 0;
        top: 44px;
        width: 100%;
        height: 44px;
        display: flex;
        z-index: 1;
    }

    .navOrder .item {
        width: 20%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 14px;
        background-color: #fff;
    }

    .navOrder .item.con {
        color: var(--color-tint);
        font-weight: bold;
    }

    .wrapper {
        position: absolute;
        top: 88px;
        left: 0;
        right: 0;
        bottom: 49px;
    }

    .orderList {
        width: 100%;
        background-color: #fff;
    }
    .orderList .order{
        display: block;
    }
    .orderList .order .h1 {
        height: 30px;
        line-height: 30px;
        color: #a6a6a6;
        font-size: 15px;
        border-top: 1px solid #eeeeee;
        /* border-bottom:1px solid #f5f6f7; */
        padding: 0 10px;
        position: relative;
    }

    .orderList .order .h1 .type {
        position: absolute;
        top: 0;
        right: 17px;
        color: #ff654a
    }

    .orderList .order .bottom {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin: 6px 10px 10px;
        align-items: center;
    }

    .orderList .order .bottom .fl {
        color: #a6a6a6;
        line-height: 18px;

    }

    .orderList .order .bottom .fl .price {
        font-size: 14px;
        color: #262626;
    }

    .orderList .order .bottom .fr {
        margin-right: 10px;
    }

    .orderList .order .bottom .fr .btn {
        font-size: 13px;
        height: 21px;
        padding: 0 4px;
        line-height: 21px;
        text-align: center;
        color: #a6a6a6;
        border: 1px solid #a6a6a6;
        border-radius: 6px;
    }

    .goodslist {
        display: flex;
        padding: 8px 9px 8px;
    }

    .goodslist img {
        width: 100px;
        height: 120px;
        border-radius: 6px;
    }

    .goodslist .goodsright {
        margin: 0 0 0 10px;
        width: 100%;
        position: relative;
    }

    .goodslist .goodsright .goods-name {
        color: #b9b4b4
    }

    .goodslist .goodsright .goods-num {
        position: absolute;
        right: 6px;
        bottom: 0;
        color: #bdb7b7;
        font-size: 14px;
    }

    .goodslist .goodsright .goods-price {
        color: #ff654a;
        position: absolute;
        left: 0;
        bottom: 0;
    }

</style>