import Vue from 'vue'
import Vuex from 'vuex'
import { cangKuUserLogin } from '@/api'

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    token: '',
    phonenum: '',
  },
  mutations:{
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PHONENUM: (state, phonenum) => {
      state.phonenum = phonenum
    },
  },
  actions:{
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        cangKuUserLogin(userInfo).then(async response => {
          const { ret } = response
          commit('SET_TOKEN', ret)
          commit('SET_PHONENUM', userInfo.phonenum)
          await uni.setStorageSync('token', ret)
          await uni.setStorageSync('phonenum', userInfo.phonenum)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_PHONENUM', '')
        uni.setStorageSync('token', '')
        uni.setStorageSync('phonenum', '')
        uni.navigateTo({
          url: `/pages/login/index`,
        });
        resolve()
      })
    },

  }
})

export default store