import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vuex
import shuju from '../api/axios'

Vue.use(Vuex); //使用vuex



const store = new Vuex.Store({
  state: { //要设置的全局访问的state对象
    live_list: [],
    rolemenu:[], // 菜单列表
  },
  getters: {
    doneTodos: state => {
        console.log(state.live_list.filter(todo => todo.live_name))
      return state.live_list.filter(todo => todo)
    }
  },
  mutations: {
    get_live_list(state, all_goods) {  //获取直播平台列表
      state.live_list = all_goods;
    },
    get_mune_list(state, all_goods) {  //获取菜单列表
      state.rolemenu = all_goods;
    },
  },
  actions: { //context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')
    get_live_list({
      commit }, {url,params}) {shuju.getdata(url, {
        params}).then(res => { commit("get_live_list", res.data.data);})
    },
    get_mune_list({
        commit }, {url,params}) {shuju.getdata(url, {
          params}).then(res => { commit("get_mune_list", res.data.data);})
      },
  }

}); //声明store

export default store; //暴露store
