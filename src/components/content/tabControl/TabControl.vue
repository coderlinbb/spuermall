<template>
    <div class="tab-control">
        <!-- 选项卡 -->
        <div class="option" v-for="(item,index) in titles" :key="index"
            :class="{active:index===currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return{
                currentIndex:0,
            }
        },
        methods:{
            itemClick(index){
                // console.log('点击了')
                this.currentIndex = index;
                this.$emit('tabClick',index);
            }
        }
    }
</script>

<style scoped>
    .tab-control{
        padding: 10px 0 10px;
        display: flex;
        text-align: center;
        position: relative;
        z-index: 10;
        background-color: #fff;
    }
    .option{
        flex:1
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom:3px solid var(--color-high-text);
        padding-bottom:3px;
    }
    .fixed{
        position: fixed;
        top:44px;
        left: 0;
        right: 0;
    }
</style>