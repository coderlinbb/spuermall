<template>
    <div class="goods-params" v-if="Object.keys(goodsParams).length!==0">
        <table class="params">
            <tr class="params-item" v-for="item in goodsParams.sizes[0]">
                <th class="item-title">{{item[0]}}</th>
                <td class="item-params" v-for="index in item.length-1">{{item[index]}}</td>
            </tr>
        </table>
        <table class="params">
            <tr class="params-item" v-for="item in goodsParams.infos">
                <th class="item-title info-title">{{item.key}}</th>
                <td class="item-params info-params">{{item.value}}</td>
            </tr>
        </table>
        <div class="img" v-if="goodsParams.image">
            <img :src="goodsParams.image">
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodsParams",
        props: ['goodsParams'],
        // watch: {
        //     goodsParams() {
        //         console.log(this.goodsParams)
        //     }
        // }
    }
</script>

<style scoped>
    .params {
        width: 100%;
    }

    .params-item {
        width: 100%;
        /*border: 1px solid #ebebeb;*/
    }

    .item-title {
        width: 30%;
        text-align: left;
        padding: 10px 20px 9px;
        border-bottom: 1px solid #ebebeb;
    }

    .item-params {
        text-align: center;
        padding: 10px 10px 9px;
        border-bottom: 1px solid #ebebeb;
        color:var(--color-tint);
    }
    .img{
        width: 100%;
    }
    .img img{
        width: 100%;
    }
</style>