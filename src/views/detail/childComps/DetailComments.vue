<template>
    <div class="comments">
        <div class="title">
            <span>用户评价({{goodsComments.count}})</span>
            <span class="more">更多</span>
        </div>
        <div class="content" v-if="goodsComments.list">
            <div class="content-item">
                <div class="user">
                    <img :src="goodsComments.list.user.avatar">
                    <span class="name">{{goodsComments.list.user.uname}}</span>
                </div>
                <div class="comment">
                    {{goodsComments.list.content}}
                </div>
                <div class="goods-info">
                    {{goodsComments.list.created | createdTime}}&nbsp;&nbsp;{{goodsComments.list.style}}
                </div>
                <div class="img" v-if="goodsComments.list.images">
                    <img :src="item" v-for="item in goodsComments.list.images">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailComments",
        props:['goodsComments'],
        filters:{
            createdTime(val){
                let date = new Date(val*1000);
                return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay()+
                    ' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            }
        }
    }
</script>

<style scoped>
    .comments{
        padding: 10px 20px;
        border-top: 10px solid #f2f2f2;
    }
    .title{
        font-weight: bold;
        padding: 10px 0 9px;
        border-bottom:1px solid #ebebeb;
    }
    .more{
        font-weight: normal;
        float: right;
    }
    .user{
        height: 50px;
        line-height: 50px;
        margin: 10px 0;
    }
    .user img{
        width: 49px;
        height: 49px;
        border: 1px solid #f8f6f7;
        border-radius: 50%;

    }
    .user .name{
        vertical-align: top;
        margin-left: 14px;
    }
    .comment{
        font-size: 15px;
        margin-bottom: 10px;
        color: #7a7a7a;
    }
    .goods-info{
        margin-bottom: 10px;
        font-size: 14px;
        color: #a5a5a5;
    }
    .img{
        display: flex;
        flex-wrap: wrap;
    }
    .img img{
        width: calc(33.333% - 10px);
        /*width: 100px;*/
        /*height: 100px;*/
        border-radius: 6px;
        margin-right: 10px;
    }
</style>