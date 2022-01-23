import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";


Vue.config.productionTip = false
import 'vant/lib/index.css';
import { Swipe, SwipeItem, Checkbox, CheckboxGroup, Card, SubmitBar, AddressList, AddressEdit} from 'vant';

Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(AddressList);
Vue.use(AddressEdit);


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
