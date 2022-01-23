<template>
    <div class="goods-info" v-if="Object.keys(detailInfo).length!==0">
        <div class="info clearfix">
            <div class="desc"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
                 :src="item" @load="imgLoad">
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodsInfo",
        props:['detailInfo'],
        data(){
            return{
                counter:0
            }
        },
        methods:{
            imgLoad(){
                this.counter++;
                if(this.counter/2==this.detailInfo.detailImage[0].list.length||
                    this.counter==this.detailInfo.detailImage[0].list.length){
                    this.$emit('refreshScroll');//图片加载完成后刷新滚动
                }
            }
        }
    }
</script>

<style scoped>
    .info-key{
        margin:20px 0 0;
        border-bottom:6px solid #f5f5f5;
        border-top:6px solid #f5f5f5;
        padding:6px 6px;
        text-align: center;
        /*border-radius: 8px;*/
        color:#666666;
        font-weight: bold;
    }
    .info-list img{
        width: 100%;
    }
</style>