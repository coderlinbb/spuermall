<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="swiper-item" v-for="item in swiperImages">
            <img :src="item">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        name: "DetailSwiper",
        props:['swiperImages']
    }
</script>

<style scoped>
    .my-swipe {
        width: 100%;
        height: 300px;
        font-size:0;
    }
    .swiper-item{
        /*overflow: hidden;*/
    }
    img{
        width: 100vw;
    }
</style>