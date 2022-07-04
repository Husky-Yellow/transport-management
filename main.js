import App from './App'
import Vue from 'vue'
Vue.config.productionTip = false
const app = new Vue({
    ...App
})
app.$mount()