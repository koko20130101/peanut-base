import Vue from 'vue'
import App from './App.vue'
import {api} from '@/api'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index'
import store from './store/'
import ElementUI from 'element-ui';

Vue.config.productionTip = false
Vue.prototype.api = api
Vue.use(ElementUI);
store.dispatch('app/restoreData')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
