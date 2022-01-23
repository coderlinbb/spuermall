<template>
    <div class="pay" v-if="defaultAddr">
        <nav-bar class="nav-bar">
            <div slot="left" class="left" @click="backClick">
                <img src="~assets/img/common/back_white.png">
            </div>
            <div slot="center">支付</div>
        </nav-bar>
        <div class="title">选择地址</div>
        <div class="adrs" @click="toAddress">
            <img src="~assets/img/pay/position.png" class="position">
            <div class="pay-content">
                <div class="name">
                    <span>{{defaultAddr.name}}&nbsp;&nbsp;</span>
                    <span>{{defaultAddr.tel}}</span>
                </div>
                <div class="addr">
                    <span>{{defaultAddr.address}}</span>
                </div>
            </div>
            <img src="~assets/img/pay/icon-arrow.png" class="iconArrow">
        </div>
        <scroll ref="scroll" class="wrapper">
            <cart-list @refresh="refresh"></cart-list>
        </scroll>
        <van-submit-bar class="submit-bar"
                        :price="price*100" :button-color="'#ff8198'" button-text="支付"
                        @submit="onSubmit">
        </van-submit-bar>
    </div>
</template>

<script>

    import NavBar from "../../components/common/navbar/NavBar";
    import Scroll from "../../components/content/Scroll/Scroll";
    import CartList from "../cart/childComps/CartList";
    import {Toast} from 'vant'
    export default {
        name: "Pay",
        components: {CartList, Scroll, NavBar},
        data(){
            return{
              defaultAddr:''
            }
        },
        created() {
            if(!this.$store.state.chosenAddressId) {
                //这里判断常规情况下没有带参表示选中默认地址
                let index = this.$store.state.addressList.findIndex(item => item.isDefault);
                if (index != -1)
                    this.defaultAddr = this.$store.state.addressList[index];
            }
            else{
                //当点击地址跳转到选择地址，选择完成后跳转回该页面时触发else
                let index = this.$store.state.addressList.findIndex(item => item.id==this.$store.state.chosenAddressId);
                this.defaultAddr = this.$store.state.addressList[index];
            }
        },
        methods:{
            toAddress(){
                this.$router.push('/address')
            },
            backClick(){
                this.$router.go(-1);
            },
            onSubmit(){
                new Promise(resolve =>{
                    Toast.loading({
                        message: '支付中...',
                        forbidClick: true,
                        duration:1500
                    });
                    setTimeout(()=>{
                        resolve();
                    },1500);
                }).then(res=>{
                    return new Promise(resolve => {
                        Toast.success({
                            message:'支付成功',
                            duration:1500,
                        });
                        setTimeout(()=>{
                            resolve();
                        },1500);
                    }).then(res=>{
                        this.$store.commit('setOrder');//生成订单
                        this.$router.push('/order');
                    })
                })
            },
            refresh(){
                this.$refs.scroll.refresh();
            }
        },
        computed:{
            price: function () {
                let tmp = 0;
                this.$store.state.cartList.forEach(item => {
                    if (item.checked == true) {
                        tmp = item.price*item.num;
                    }
                });
                return tmp;
            },
        }
    }
</script>

<style scoped>
    @import "~assets/css/views/Pay/pay.css";
    .nav-bar{
        background-color: var(--color-tint);
        color:#fff;
        font-weight: bold;
    }
    .wrapper{
        position: absolute;
        top:135px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .left img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }
    .title{
        font-size: 15px;
        font-weight: bold;
        padding: 10px 15px;
        position: relative;
        background-color:#fff;
        z-index: 1;
    }
    .adrs{
        padding:10px;
        position: relative;
        background-color: #fff;
        margin-bottom: 10px;
        border-top: 1px solid #f0f0f0;
        border-bottom:1px solid #f0f0f0;
        position: relative;
        z-index: 1;
    }
    .adrs img{
        width: 18px;
        height: 18px;
        position: absolute;
        top:13px;
        left:13px;
    }
    .adrs .pay-content{
        margin:0 30px;
    }
    .adrs .iconArrow{
        left:auto;
        top:20px;
        right: 20px;
    }
    .adrs .addr{
        font-size:12px;
        color:#888888;
    }
    .submit-bar{
        border-top: 1px solid #ebebeb;
    }
</style>