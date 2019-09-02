import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vuex
import shuju from '../api/axios'
import createVuexAlong from 'vuex-along' //防止数据刷新丢失

Vue.use(Vuex); //使用vuex

const store = new Vuex.Store({
  state: { //要设置的全局访问的state对象
    live_list: [],
    rolemenu: [], // 菜单列表
    banzhuren_list: [],
    teacher_data: [], //讲师列表
    zhujiao_data: [], //助教列表
    jiaowu_data: [], //教务专员列表
    region_list: [], //地址数据
    application: {}, //查看报名表数据
    needs: {}, //查看排课需求
    teacher_course: {}, //查看老师课表
    student_course: {}, //查看学生课表
    look_arrange: {}, //查看排课
  },
  getters: {
    doneTodos: state => {
      return state.live_list.filter(todo => todo)
    }
  },
  mutations: {
    get_live_list(state, all_goods) { //获取直播平台列表
      state.live_list = all_goods;
    },
    get_mune_list(state, all_goods) { //获取菜单列表
      state.rolemenu = all_goods;
    },
    get_banzhuren_list(state, all_goods) { //获取班主任列表
      state.banzhuren_list = all_goods
    },
    get_teacher_data(state, all_goods) { //获取讲师列表
      state.teacher_data = all_goods
    },
    get_zhujiao_data(state, all_goods) { //获取助教列表
      state.zhujiao_data = all_goods
    },
    get_jiaowu_data(state, all_goods) { //取教务专员列表
      state.jiaowu_data = all_goods
    },
    get_region_list(state, all_goods) { //地址列表
      state.region_list = all_goods
    },
    get_application(state, all_goods) {  //查看报名表数据
      state.application = all_goods
    },
    get_needs(state, all_goods) { //查看排课需求
      state.needs = all_goods
    },
    get_teacher_course(state, all_goods) { //查看老师课表
      state.teacher_course = all_goods
    },
    get_student_course(state, all_goods) { //查看学生课表
      state.student_course = all_goods
    },
    get_look_arrange(state, all_goods) { //查看排课
      state.look_arrange = all_goods
    },
  },
  actions: { //context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')
    get_live_list({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, {
        params
      }).then(res => {
        commit("get_live_list", res.data.data);
      })
    },
    get_mune_list({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_mune_list", res.data.data);
      })
    },
    get_banzhuren_list({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_banzhuren_list", res.data.data.list);
      })
    },
    get_teacher_data({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_teacher_data", res.data.data.list);
      })
    },
    get_zhujiao_data({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_zhujiao_data", res.data.data.list);
      })
    },
    get_jiaowu_data({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_jiaowu_data", res.data.data.list);
      })
    },
    get_region_list({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_region_list", res.data.options);
      })
    },
    get_application({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_application", res.data.data);
      })
    },
    get_needs({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_needs", res.data.data);
      })
    },
    get_teacher_course({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_teacher_course", res.data.data);
      })
    },
    get_student_course({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_student_course", res.data.data);
      })
    },
    get_look_arrange({
      commit
    }, {
      url,
      params
    }) {
      shuju.getdata(url, params).then(res => {
        commit("get_look_arrange", res.data.data);
      })
    },
  },


  plugins: [createVuexAlong(
    // {
    //   name: "hello-vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
    //   local: {
    //     list: ["rolemenu"],
    //     isFilter: true // 过滤模块 ma 数据， 将其他的存入 localStorage
    //   },
    //   session: {
    //     list: ["live_list",'banzhuren_list'] // 保存 count 和模块 ma 中的 a1 到 sessionStorage
    //   }
    // }
  )]
}); //声明store

export default store; //暴露store
