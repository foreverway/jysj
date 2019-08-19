import Vue from 'vue';  //引入vue
import Vuex from 'vuex';  //引入vuex
Vue.use(Vuex);     //使用vuex

import collections  from "./modules/collections"  //导入模块
//在这里我使用modules模块化,所以每个模块单独写


// const state={   //要设置的全局访问的state对象
//     changableNum:0
//     //要设置的初始属性值
// }
//this.$store.state.对象名可以在任何一个组件里获取到state的值
// //getters，和vue计算属性computed一样，来实时监听state值的变化(最新状态)
// const getters = {
//     getChangeNum(){  //方法名随意  用来返回变化的changableNum的值
//         return state.changebleNum
//     }
// }
// const mutations = {
//     newNum(state,sum){ // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
//         state.changebleNum+=sum;
//     }  // this.$store.commit('newNum',6) 在别的组件里面进行改变changebleNum的值,但这样不理想,多次引用会冲突
// }
// const actions ={ // Action方法 可以包含任意异步操作，
//     //这里面的方法是用来异步触发mutations里面的方法，
//     //actions里面自定义的函数接收一个context参数和要变化的形参
//     getNewNum(context,num){   //num为要变化的形参
//         context.commit('newNum',num)
//         //context与store实例具有相同的方法和属性，所以它可以执行context.commit(' ')
//     }
// }
//外部组件里进行全局执行actions里面方法的时候，你只需要用执行
//使用   this.$store.dispatch('getNewNum'，6) //6要变化的实参
const store = new Vuex.Store({
    // state,
    // getters,
    // mutations,
    // actions
    modules:{
        collections
    }
});    //声明store
 
export default store;   //暴露store