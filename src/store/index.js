import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        cartList:[],
        addressList:[
            {
                id: 1,
                name: 'lin',
                tel: '13000000000',
                address:'广东省广州市番禺区某路某小区1栋1001',
                isDefault: true,
            },
            {
                id: 2,
                name: 'zs',
                tel: '1310000000',
                address:'广东省广州市天河区某路某小区2栋1002',
            },
        ],
        chosenAddressId:'',
        order:[],
        collectList:[]
    },
    mutations:{
        addToCart(state,info){
            let index = state.cartList.findIndex(item=>item.id==info.id);
            if(index == -1)
                state.cartList.push(info);
            else state.cartList[index].num++;
        },
        itemCheck(state,id){//单选
            let index = state.cartList.findIndex(item=>item.id==id);
            state.cartList[index].checked = !state.cartList[index].checked;
        },
        setChosenId(state,id){//选中地址后跳转回支付页面的缓存
            // console.log('setChosenId');
            state.chosenAddressId = id;
        },
        setOrder(state){//生成订单
            let checkedList = state.cartList.filter(item=>item.checked);//选中的商品
            let price = 0;//订单总价格
            state.cartList.forEach(item=>{
                price+=item.price*item.num;
            });
            state.order.push({
                orderId:new Date().getTime(),
                orderList:checkedList,
                type:2,//2表示待发货
                total:price
            })
        },
        changeOrderType(state,index){
            if(state.order[index].type<=3){
                console.log('改变了');
                state.order[index].type++;
            }
        },
        setCollect(state,info){
            let index = state.collectList.findIndex(item=>item.id==info.id);
            if(index==-1){
                state.collectList.push(info)
            }
            else state.collectList.splice(index,1);
        },
        addAddress(state,info){
            let inf = info;
            let id =state.addressList[state.addressList.length-1].id+1;
            inf.id = id;
            state.addressList.push(inf);

        },
        setAddress(state,res){
            let index = res.index;
            let id =state.addressList[state.addressList.length-1].id+1;
            state.addressList[index] = res.info;
            Vue.$set(state.addressList[index],'id',id);
        }
    }
})

export default store;