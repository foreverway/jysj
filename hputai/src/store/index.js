import Vue from 'vue';  //引入vue
import Vuex from 'vuex';  //引入vuex
import shuju from '../api/axios'

Vue.use(Vuex);     //使用vuex

const state={   //要设置的全局访问的state对象
    live_list:[]
    //要设置的初始属性值
}
//this.$store.state.对象名可以在任何一个组件里获取到state的值
//getters，和vue计算属性computed一样，来实时监听state值的变化(最新状态)
const getters = {
    getChangelive_list(){  //方法名随意  用来返回变化的changableNum的值
        return state.live_list
    }
}
const mutations = {
    get_live_list(state,all_goods){
        state.live_list = all_goods ;
    },
  }
const actions ={ // Action方法 可以包含任意异步操作，

    get_live_list({commit},{url,params}){
        shuju.getdata(url,{
          params
      }).then(res=>{
       
          commit("get_live_list",res.data);
      })
      },
        //context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')
    
}
//外部组件里进行全局执行actions里面方法的时候，你只需要用执行
//使用   this.$store.dispatch('getNewNum'，6) //6要变化的实参
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
    // modules:{
    //     collections
    // }
});    //声明store
 
export default store;   //暴露store