<template>
    <div class="category">
        <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
        </nav-bar>
        <div class="content">
            <left-nav-bar :categoryLists="categoryLists"
                          :currentIndex="currentIndex"
                          @selectItem="selectItem"></left-nav-bar>
            <right-content :listItems="listItems"></right-content>
        </div>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import Scroll from "../../components/content/Scroll/Scroll";
    import {getCategory, getSubcategory, getCategoryDetail} from "../../network/category"
    import LeftNavBar from "./childComps/LeftNavBar";
    import RightContent from "./childComps/RightContent";

    export default {
        name: "Home",
        components: {RightContent, LeftNavBar, Scroll, NavBar},
        data() {
            return {
                categoryLists: [],//左
                listItems: [],//右
                currentIndex: 0
            }
        },
        methods: {
            getCategory() {//获取左导航栏内容
                getCategory().then(res => {
                    // console.log(res);
                    this.categoryLists = res.data.category.list;
                    this.selectItem(0);
                })
            },
            getCategoryDetail(type) {
                getCategoryDetail(type)
            },
            selectItem(index) {
                this.currentIndex = index;
                let mailKey = this.categoryLists[index].maitKey;//通过mailKey查询到对应的商品数据
                // console.log(mailKey);
                getSubcategory(mailKey).then(res => {
                    // console.log(res);
                    this.listItems = [];
                    this.listItems = res.data.list;
                })
            }
        },
        created() {
            this.getCategory();
        }
    }
</script>

<style scoped>
    @import "~assets/css/views/Category/category.css";

    .nav-bar {
        background-color: var(--color-tint);
        font-weight: bold;
        color: #fff;
    }

    .content {
        display: flex;
        height: 100%;
    }
</style>