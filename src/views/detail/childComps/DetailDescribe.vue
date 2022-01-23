<template>
    <div class="detail-describe" v-if="Object.keys(describe).length!==0">
        <div class="title">{{describe.title}}</div>
        <div class="price">
            <span class="new-price">{{describe.newPrice}}</span>
            <span class="old-price">{{describe.oldPrice}}</span>
            <span v-if="describe.discount" class="discount">{{describe.discount}}</span>
        </div>
        <div class="other" v-if="describe.columns.length!==0">
            <span>{{describe.columns[0]}}</span>
            <span>{{describe.columns[1]}}</span>
            <span>{{describe.services[describe.services.length-1].name}}</span>
        </div>
        <div class="service" v-if="describe.services.length!==0">
            <!--  1~(length-1) -->
            <span class="service-item" v-for="index in describe.services.length-1" :key="index">
                <img :src="describe.services[index-1].icon">
                <span>{{describe.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailDescribe",
        props:['describe'],
        // watch:{
        //     describe(){
        //         console.log('describe变化了')
        //     }
        // }
    }
</script>

<style scoped>
    .detail-describe{
        padding:10px 8px 0;
    }
    .title{
        letter-spacing: .6px;
    }
    .price{
        margin: 10px 6px 20px;
    }
    .price .new-price{
        color: var(--color-tint);
        font-weight: bold;
        font-size: 18px;
    }
    .price .old-price{
        color: #919191;
        font-size: 14px;
        text-decoration: line-through;
        margin:0 8px 0;
    }
    .price .discount{
        background-color: var(--color-tint);
        color:#fff;
        font-size: 12px;
        border-radius: 16px;
        /*display: inline-block;*/
        padding:3px 6px;
        position: relative;
        top:-4px;
    }

    .other{
        display: flex;
        justify-content: space-between;
        color:#919191;
        font-size: 14px;
        padding:0 6px 9px;
        border-bottom:1px solid #ebebeb;
    }

    .service{
        display: flex;
        justify-content: space-between;
        line-height: 60px;
    }
    .service-item img{
        width: 14px;
        height: 14px;
        position: relative;
        top:2px;
    }
    .service-item span{
        font-size: 14px;
    }
</style>