<template>
    <div class="address">
        <nav-bar class="nav-bar">
            <div slot="left" @click="backOnly"><img src="~assets/img/common/back_white.png"></div>
            <div slot="center">选择地址</div>
        </nav-bar>
        <van-address-list
                v-model="chosenId"
                :list="$store.state.addressList"
                :checked-color="'#ff8198'"
                @add="onAdd"
                @edit="onEdit"
                @select="backClick"
        />
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";

    export default {
        name: "Address",
        components: {NavBar},
        data() {
            return {
                chosenId: 1
            }
        },
        created() {
            //默认id
            if(!this.$store.state.chosenAddressId) {//如果vuex里没有chosenid 勾选默认地址
                let index = this.$store.state.addressList.findIndex(item => item.isDefault);
                this.chosenId = this.$store.state.addressList[index].id;
            }
            else{
                let index = this.$store.state.addressList.findIndex(item => item.id==this.$store.state.chosenAddressId);
                this.chosenId = this.$store.state.addressList[index].id;
            }
        },
        methods: {
            onAdd() {
                this.$router.push({name:'AddressEdit',query:{type:'add'}});
            },
            onEdit(index) {
                this.$router.push({name:'AddressEdit',query:{type:'edit',index}});
            },
            backOnly(){
                this.$router.go(-1);
            },
            backClick(item,index){
                //点击后改变chosenId并返回到支付页面
                // console.log(index);
                this.$store.commit('setChosenId',this.$store.state.addressList[index].id)
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>
    @import "~assets/css/views/Address/Address.css";
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: bold;
    }
    .left img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }
    .van-button{
        background-color: var(--color-tint);
        border-color:var(--color-tint);
    }
</style>