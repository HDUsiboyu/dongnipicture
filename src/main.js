import Vue from 'vue'
import App from './App'
import request from './utils/request'
import './filters'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.request = request

const app = new Vue({
  ...App
})
app.$mount()
