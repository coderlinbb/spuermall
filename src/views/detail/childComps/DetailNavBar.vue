<template>
    <nav-bar>
        <div slot="left" class="left" @click="backClick">
            <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="title">
            <div class="item" v-for="(item,index) in titles" :key="index"
            :class="{active:index===currentIndex}" @click="changeIndex(index)">{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components: {NavBar},
        data(){
            return{
                titles:['商品','参数','评论','推荐',],
                currentIndex:0
            }
        },
        methods:{
            changeIndex(index){
                this.currentIndex = index;
                this.$emit('titleClick',index);
            },
            backClick(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 14px;
    }
    .item{
        flex:1
    }
    .active{
        color:var(--color-high-text);
    }

    .left img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }
</style>