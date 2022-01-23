import Vue from 'vue';
import VueRouter from "vue-router";

import Detail from "../views/detail/Detail";
const Home=()=>import('../views/home/Home');
const Category=()=>import('../views/category/Category');
const Cart=()=>import('../views/cart/Cart');
const Profile=()=>import('../views/profile/Profile');
const Pay=()=>import('../views/pay/Pay');
const Address=()=>import('../views/address/Address');
const AddressEdit=()=>import('../views/address/childComps/AddressEdit');
const Order=()=>import('../views/order/Order');
const Collection=()=>import('../views/collection/Collection')
Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法,防止重复点击报红
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name:'Home',
        component: Home
    },
    {
        path: '/category',
        name:'Category',
        component: Category
    },
    {
        path: '/cart',
        name:'Cart',
        component: Cart
    },
    {
        path: '/profile',
        name:'Profile',
        component: Profile
    },
    {
        path: '/detail',
        name:'Detail',
        component: Detail
    },
    {
        path: '/pay',
        name:'Pay',
        component: Pay
    },
    {
        path: '/address',
        name:'Address',
        component: Address
    },
    {
        path:'/addressedit',
        name:'AddressEdit',
        component:AddressEdit
    },
    {
        path:'/order',
        name:'Order',
        component:Order
    },
    {
        path:'/collection',
        name:'Collection',
        component:Collection
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router