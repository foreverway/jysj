import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vuex
import shuju from '../api/axios'

Vue.use(Vuex); //使用vuex



const store = new Vuex.Store({
  state: { //要设置的全局访问的state对象
    live_list: [],
    rolemenu:[], // 菜单列表
    banzhuren_list:[],
    teacher_data:[],  //讲师列表
    zhujiao_data:[],   //助教列表
    jiaowu_data:[],     //教务专员列表
  },
  getters: {
    doneTodos: state => {
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
    get_banzhuren_list(state,all_goods){  //获取班主任列表
      state.banzhuren_list=all_goods
    },
    get_teacher_data(state,all_goods){  //获取讲师列表
      state.banzhuren_list=all_goods
    },
    get_zhujiao_data(state,all_goods){  //获取助教列表
      state.banzhuren_list=all_goods
    },
    get_jiaowu_data(state,all_goods){  //取教务专员列表
      state.banzhuren_list=all_goods
    },
  },
  actions: { //context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')
    get_live_list({
      commit }, {url,params}) {shuju.getdata(url, {
        params}).then(res => { commit("get_live_list", res.data.data);})
    },
    get_mune_list({commit }, {url,params}) {
      shuju.getdata(url, params).then
      (res => { commit("get_mune_list", res.data.data);})
      },
      get_banzhuren_list({commit }, {url,params}) {
        shuju.getdata(url, params).then
        (res => { commit("get_banzhuren_list", res.data.data.list);})
        },
        get_teacher_data({commit }, {url,params}) {
          shuju.getdata(url, params).then
          (res => { commit("get_teacher_data", res.data.data.list);})
          },
          get_zhujiao_data({commit }, {url,params}) {
            shuju.getdata(url, params).then
            (res => { commit("get_zhujiao_data", res.data.data.list);})
            },
            get_jiaowu_data({commit }, {url,params}) {
              shuju.getdata(url, params).then
              (res => { commit("get_jiaowu_data", res.data.data.list);})
              },
  }

}); //声明store

export default store; //暴露store
