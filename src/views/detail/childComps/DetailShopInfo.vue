<template>
    <div class="shop-info" v-if="Object.keys(shop).length!==0">
        <div class="top">
            <img :src="shop.logo">
            <span class="title">{{shop.name}}</span>
        </div>
        <div class="middle">
            <div class="middle-left">
                <div class="item-sells">
                    <div class="sells-count">{{shop.sells | totalCount}}</div>
                    <div class="sells-text">总销量</div>
                </div>
                <div class="item-goods">
                    <div class="goods-count">{{shop.goodsCount}}</div>
                    <div class="goods-text">全部宝贝</div>
                </div>
            </div>
            <div class="middle-right">
                <div class="right-item" v-for="item in shop.score">
                    <span class="item-name">{{item.name}}</span>
                    <span class="item-better" :style="{backgroundColor:item.isBetter?'#ff777e':'#34bd46'}">{{item.isBetter | betterFilter}}</span>
                    <span class="item-score" :style="{color:item.isBetter?'#ff777e':'#34bd46'}">{{item.score.toFixed(2)}}</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-btn">进店逛逛</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailShopInfo",
        props:['shop'],
        filters:{
            totalCount(val){
                if(val>=10000){
                    if(val<100000000)
                        return (val/10000).toFixed(1)+'万'
                    else return (val/100000000).toFixed(1)+'亿'
                }
                else return val;
            },
            betterFilter(val){
                if(!val) return '低'
                else return '高'
            }
        }
    }
</script>

<style scoped>
    .top{
        height: 80px;
        line-height: 80px;
        padding:18px 20px 10px;
        border-top: 10px solid #f2f2f2;
        /*display: flex;*/
        /*align-items: center;*/
    }
    .top img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 0 0 6px #dbdbdb;
        vertical-align: middle;
    }
    .top .title{
        vertical-align: top;
        color:#919191;
        height: 100%;
        line-height: 80px;
        margin-left: 18px;
        display: inline-block;
    }
    .middle{
        padding: 6px 10px;
        display: flex;
    }
    .middle .middle-left,.middle .middle-right{
        flex:1;
    }
    .middle .middle-left{
        display:flex;
        justify-content: space-around;
        align-items: center;
        border-right: 1px solid #cfcfcf;
    }

    .middle .middle-right .right-item{
        padding: 4px 16px;
        font-size: 14px;
    }

    .item-score,.item-better{
        float:right;
        color:#fff;
    }
    .item-score{
        margin-right: 20px;
    }
    .goods-count,.sells-count{
        height: 30px;
        /*line-height: 40px;*/
        text-align: center;
        font-weight: bold;
    }
    .goods-text,.sells-text{
        font-size: 14px;
        text-align: center;
        font-weight: bold;
    }
    .bottom{
        margin:10px 0 10px;
    }
    .bottom .bottom-btn{
        width: 30%;
        padding:8px 0;
        margin:0 auto;
        border-radius: 14px;
        text-align: center;
        background-color: #f6f6f6;
    }
</style>