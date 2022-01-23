<template>
    <div class="goods-list">
        <goods-list-item v-for="item in goods" @detailImageLoad="detailImageLoad"  :goods-item="item"></goods-list-item>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        components: {GoodsListItem},
        props:['goods'],
        methods:{
            detailImageLoad(){
                this.$emit('detailImageLoad')
            }
        }
    }
</script>

<style scoped>
    .goods-list{
        padding:10px 10px 20px;
        display: flex;
        flex-wrap: wrap;
    }
</style>