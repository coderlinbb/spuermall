<template>
    <div class="goods-item" @click="itemClick">
        <img :src="showImage" @load="detailImageLoad">
        <div class="title">{{goodsItem.title}}</div>
        <div class="detail">
            <div class="price">￥{{goodsItem.price}}</div>
            <div class="collect" @click.stop="setCollect">
                <div class="num">{{goodsItem.cfav}}</div>
                <img v-show="!isCollect" src="~assets/img/detail/collect.png">
                <img v-show="isCollect" src="~assets/img/detail/collect_active.png">
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';

    export default {
        name: "GoodsListItem",
        props: ['goodsItem', 'getOffsetY'],
        data() {
            return {
                isCollect: false
            }
        },
        methods: {
            itemClick() {
                this.$router.push({
                    name: 'Detail',
                    query: {
                        id: this.$route.path == '/home' ? this.goodsItem.iid : this.goodsItem.item_id
                    }
                });
            },
            detailImageLoad() {
                this.$emit('detailImageLoad')
            },
            setCollect() {
                if (this.$store.state.collectList.findIndex(item => item.id == this.goodsItem.iid) != -1) {
                    Toast.success('取消收藏成功')
                    this.goodsItem.cfav--;
                } else {
                    Toast.success('收藏成功')
                    this.goodsItem.cfav++;
                }
                this.isCollect = !this.isCollect;
                let info = {};
                info.id = this.goodsItem.iid;
                info.image = this.showImage;
                info.title = this.goodsItem.title;
                info.price = this.goodsItem.price;
                this.$store.commit('setCollect', info);
            }
        },
        computed: {
            showImage() {
                return this.$route.path == '/home' ? this.goodsItem.show.img : this.goodsItem.image;
            }
        },
        watch: {}
    }
</script>

<style scoped>
    .goods-item {
        width: calc(50% - 12px);
        padding: 10px 6px;
        text-align: center;
        font-size: 14px;
    }

    /*.goods-item::after {*/
    /*    content: '';*/
    /*    !*width: calc(50% - 12px);*!*/
    /*}*/
    .goods-item img {
        width: 100%;
        height: 240px;
        border-radius: 10px;
    }

    .goods-item .title {
        padding: 0 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .goods-item .detail {
        display: flex;
        align-items: center;
        height: 24px;
        justify-content: space-between;
        margin-top: 8px;
        padding: 0 6px 0;
    }

    .goods-item .detail img {
        width: 22px;
        height: 22px;
    }

    .goods-item .detail .price {
        font-weight: bold;
        font-size: 16px;
    }

    .goods-item .detail .collect {
        height: 100%;
        display: flex;
    }

    .goods-item .detail .collect .num {
        margin-right: 2px;
        height: 100%;
        line-height: 26px;
    }
</style>