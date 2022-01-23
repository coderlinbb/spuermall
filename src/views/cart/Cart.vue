<template>
   <div class="cart">
       <nav-bar class="nav-bar">
           <div slot="center">购物车</div>
       </nav-bar>
       <scroll ref="scroll" class="wrapper">
          <cart-list @refresh="refresh"></cart-list>
       </scroll>
       <van-submit-bar class="submit-bar" v-if="$store.state.cartList.length"
                       :price="price*100" :button-color="'#ff8198'" button-text="提交订单"
                       @submit="onSubmit">
           <van-checkbox checked-color="#ff8198" v-model="checkedAll">全选</van-checkbox>
       </van-submit-bar>
   </div>
</template>

<script>
    import Scroll from "../../components/content/Scroll/Scroll";
    import NavBar from "../../components/common/navbar/NavBar";
    import CartList from "./childComps/CartList";
    import {Toast} from 'vant'
    export default {
        name: "Home",
        components: {CartList, NavBar, Scroll},
        methods:{
            onSubmit(){
                if(this.price!=0)
                    this.$router.push('/pay');
                else{
                    Toast.fail('暂无选中商品')
                }
            },
            refresh(){
                this.$refs.scroll.refresh();
            }
        },
        computed:{
            checkedAll: {
                get() {
                    return this.$store.state.cartList.every(item => item.checked);
                },
                set(value) {
                    this.$store.state.cartList.forEach(item => item.checked = value);
                }
            },
            price: function () {
                let tmp = 0;
                this.$store.state.cartList.forEach(item => {
                    if (item.checked) {
                        tmp += item.price*item.num;
                    }
                });
                return tmp;
            },
        }
    }
</script>

<style scoped>
    @import "~assets/css/views/Cart/cart.css";
    .nav-bar{
        background-color: var(--color-tint);
        color:#fff;
        font-weight: bold;
    }
    .wrapper{
        position: absolute;
        top: 44px;
        bottom: 99px;
        left: 0;
        right: 0;
    }
    .submit-bar{
        position: absolute;
        bottom:49px;
        left: 0;
        right: 0;
        background-color: #f9f9f9;
    }
    .van-button{
        height: 32px;
    }
</style>