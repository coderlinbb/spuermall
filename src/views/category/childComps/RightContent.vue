<template>
    <div class="right-content" v-if="Object.keys(listItems)">
        <a class="content-item" v-for="item in listItems" :href="item.link">
            <img :src="item.image">
            <div class="title">{{item.title}}</div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "RightContent",
        props:['listItems']
    }
</script>

<style scoped>
    .right-content{
        width: 100%;
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        font-size: 14px;
        height: calc(100% - 93px);
        padding-bottom: 49px;
        overflow: auto;
    }
    .content-item{
        /*flex:1;*/
        width: 50%;
        box-sizing: border-box;
        padding: 10px 10px;
    }
    .content-item img{
        width: 80px;
        height: 80px;
    }
</style>