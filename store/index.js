import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    token: '',
    phonenum: '',
    userInfo: {}
  },
  mutations:{
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PHONENUM: (state, phonenum) => {
      state.phonenum = phonenum
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },
  actions:{
    login({ commit }, userInfo) {
      return new Promise(resolve => {
        commit('SET_TOKEN', userInfo.token)
        commit('SET_PHONENUM', userInfo.phonenum)
        commit('SET_USERINFO', userInfo)
        await uni.setStorageSync('token', userInfo.token)
        await uni.setStorageSync('userInfo', userInfo)
        await uni.setStorageSync('phonenum', userInfo.phonenum)
        resolve()
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_PHONENUM', '')
        uni.setStorageSync('token', '')
        uni.setStorageSync('phonenum', '')
        resolve()
      })
    },

  }
})

export default store