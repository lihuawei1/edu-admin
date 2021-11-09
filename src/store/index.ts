import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化的功能
  state: {
    // user: null //当前登录用户状态
    user:JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    //修改容器数据必须使用 mutation 函数
    setUser (state, payload){
      state.user = JSON.parse(payload)
      //user数据持久化
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
