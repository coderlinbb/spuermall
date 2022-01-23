<template>
    <div class="collection">
        <nav-bar class="nav-bar">
            <div slot="left" @click="backClick"><img src="~assets/img/common/back_white.png"></div>
            <div slot="center">我的收藏</div>
        </nav-bar>
        <scroll ref="scroll" class="wrapper">
            <collect-list></collect-list>
        </scroll>
    </div>
</template>

<script>
    import Scroll from "../../components/content/Scroll/Scroll";
    import CollectList from "./childComps/CollectList";
    import NavBar from "../../components/common/navbar/NavBar";
    export default {
        name: "Collection",
        components: {NavBar, CollectList, Scroll},
        data(){
            return{

            }
        },
        methods:{
            backClick(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .nav-bar{
        background-color: var(--color-tint);
        font-weight: bold;
        color: #fff;
    }
    .nav-bar img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }
    .wrapper{
        position: absolute;
        top:44px;
        bottom:49px;
        left: 0;
        right: 0;
    }
</style>