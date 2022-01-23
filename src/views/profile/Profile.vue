<template>
    <div class="profile">
        <nav-bar class="nav-bar">
            <div slot="center">我的</div>
        </nav-bar>
        <div class="head">
            <img src="~assets/img/profile/mogu.png">
            <div class="name">mogu</div>
        </div>
        <div class="order">
            <div class="order-item" v-for="(item,index) in orderItems" :key="index"
            @click="toOrder(index)">
                <img :src="item.img">
                <div>{{item.name}}</div>
            </div>
        </div>
        <div class="selection">
            <div class="selection-item"
                 v-for="(item,index) in selection" :key="index"
                 @click="toSelection(index)">
                <img :src="item.imgUrl">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";

    export default {
        name: "Home",
        components: {NavBar},
        data() {
            return {
                name: 'mogu',
                orderItems: [
                    {name: '待付款', img: require("@/static/views/Profile/daifukuan.png")},
                    {name: '待发货', img: require("@/static/views/Profile/daifahuo.png")},
                    {name: '待收货', img: require("@/static/views/Profile/daishouhuo.png")},
                    {name: '已完成', img: require("@/static/views/Profile/daipingjia.png")},
                ],
                selection:[
                    {name:'我的收藏',imgUrl:require('@/static/views/Profile/shoucang.png')},
                    {name:'我的订单',imgUrl:require('@/static/views/Profile/dingdan.png')},
                    {name:'我的地址',imgUrl:require('@/static/views/Profile/didian.png')},
                    {name:'联系客服',imgUrl:require('@/static/views/Profile/fuwu.png')},
                    {name:'关于我们',imgUrl:require('@/static/views/Profile/guanyu.png')}
                ],
            }
        },
        methods:{
            toOrder(index){
                this.$router.push({name:'Order',params:{index:index+1}});
            },
            toSelection(index){
                switch (index) {
                    case 0:this.$router.push('/collection');break;
                    case 1:this.$router.push('/order');break;
                    case 2:this.$router.push('/address');break;
                }
            }
        }
    }
</script>

<style src="assets/css/views/Profile/profile.css" scoped>

</style>