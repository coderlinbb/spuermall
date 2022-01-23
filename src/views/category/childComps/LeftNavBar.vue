<template>
    <div class="left-nav-bar" v-if="categoryLists.length!=0">
        <div :class="{'nav-item':true,'con':currentIndex==index}"
             v-for="(item,index) in categoryLists" :key="index" @click="selectItem(index)">
            {{item.title}}
        </div>
    </div>
</template>

<script>

    export default {
        name: "LeftNavBar",
        components: {},
        props: ['categoryLists', 'currentIndex'],
        methods: {
            selectItem(index) {
                this.$emit('selectItem', index)
            }
        }
    }
</script>

<style scoped>
    .left-nav-bar {
        width: 30%;
        height: calc(100% - 93px);
        padding-bottom: 49px;
        text-align: center;
        background-color: #f9f9f9;
        font-size: 14px;
        overflow: auto;
    }

    .nav-item {
        height: 49px;
        line-height: 49px;
        border-bottom: 1px solid #ebebeb;
    }

    .con {
        background-color: #fff;
        color: var(--color-tint);
        font-weight: bold;
        position: relative;
    }

    .con::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background-color: var(--color-tint);
    }
</style>