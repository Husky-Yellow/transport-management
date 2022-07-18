import App from './App'
import Vue from 'vue'
import store from './store'

Vue.config.productionTip = false
const app = new Vue({
    store,
    ...App
})
app.$mount()