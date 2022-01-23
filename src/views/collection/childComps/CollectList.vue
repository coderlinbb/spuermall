<template>
    <div class="collect-list">
        <div class="none-tips" v-if="$store.state.collectList.length==0">
            <img src="~assets/img/common/collect.svg">
            <div class="none-text">暂无收藏</div>
        </div>
        <div class="collect-item" v-else v-for="(item,index) in $store.state.collectList" :key="item.id"
         @click="itemClick(item.id)">
            <div class="left">
                <img :src="item.image">
            </div>
            <div class="right">
                <div class="title">{{item.title}}</div>
                <div class="total">
                    <span class="price">￥{{item.price}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CollectList",
        methods:{
            itemClick(id){
                this.$router.push({
                    name: 'Detail',
                    query: {
                        id
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .collect-list{
        height: 100%;
    }
    .none-tips{
        text-align: center;
        position: absolute;
        top:80px;
        left: 0;
        right: 0;
        color:#919191;
    }
    .none-tips img{
        width: 90px;
        height: 90px;
        opacity: .8;
    }
    .collect-item{
        display: flex;
        width: 100%;
        font-size: 15px;
        padding: 5px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
    }
    .left{
        width: 160px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .left img{
        height: 110px;
        width:80px;
        border-radius: 5px;
    }
    .right{
        width: 100%;
        overflow: hidden;
        margin:6px 4px;
        position: relative;
    }
    .right .title,.right .desc,.right .total{
        margin:3px 6px;
        text-overflow:ellipsis;
        overflow : hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical; /* 垂直排列 */
        word-break: break-all;  /* 内容自动换行 */
        -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    }
    .right .title{
        -webkit-line-clamp: 2; /* 限制在一个块元素显示的文本的行数 */
        font-size: 15px;
    }
    .right .desc{
        margin-top:20px;
        font-size: 12px;
        color:#919191;
    }
    .right .total{
        position: absolute;
        bottom:0;
        left: 0;
        right: 0;
        font-size: 15px;
    }
    .total .price{
        font-weight: bold;
        color: var(--color-tint);
    }
    .total .num{
        float:right;
    }
</style>