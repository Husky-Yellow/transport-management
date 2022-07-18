import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api'

Vue.use(Vuex)
const store = new Vuex.Store({
  actions:{
    login({}, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(async response => {
          await uni.setStorageSync('referrerInfo', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        uni.setStorageSync('referrerInfo', {})
        uni.navigateTo({
          url: `/pages/login/index`,
        });
        resolve()
      })
    },

  }
})

export default store