<template>
    <div class="address-edit">
        <nav-bar class="nav-bar">
            <div slot="left" class="left" @click="backClick">
                <img src="~assets/img/common/back.svg">
            </div>
            <div slot="center">地址编辑</div>
        </nav-bar>
        <van-address-edit
                show-search-result
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                :area-list="areaList"
                @save="onSave"
        />
    </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    import {areaList} from '@vant/area-data';
    import {Toast} from 'vant'

    export default {
        name: "AddressEdit",
        components: {NavBar},
        data() {
            return {
                areaList
            }
        },
        methods: {
            onSave(content) {
                let {name, tel, province, city, county, addressDetail} = content;
                let address = province+city+county+addressDetail;
                let info = {
                    name, tel, address
                };
                if(this.$route.query.type =='add'){
                    this.$store.commit('addAddress',info);
                    Toast.success('添加地址成功')
                    this.$router.go(-1);
                }
                else if(this.$route.query.type == 'edit'){
                    //编辑时传入对应编辑地址的index,还有对应修改之后的信息
                    let res = {
                        index:this.$route.query.index,
                        info
                    }
                    this.$store.commit('setAddress',res);
                }
            },
            backClick() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: bold;
    }

    .left img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }

    .address-edit {
        padding-top: 44px;
    }

    .van-button--danger {
        background-color: var(--color-tint) !important;
        border-color: var(--color-tint) !important;
    }
</style>