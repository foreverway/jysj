//applyNeeds
import shuju from '../../api/axios'
const state ={
    live_list:[] //要设置的初始属性值
}

const getters = {  //实时监听state值的变化(最新状态)
    get_live_list(){  //承载变化的live_list的值
        return state.live_list
    }
}

const mutations ={
    get_live_list(state,newState){
        state.live_list= newState ;
    },
}
const actions = {
    get_live_list({commit},{url,params}){
        shuju.getdata(url,params
    //         ,{
    //       
    //   }
      ).then(res=>{
        // console.log(res);
          commit("get_live_list",res.data.result);
      })
    },
    // get_live_list(context,newState){
    //     context.commit('state.live_list',newState)
    // }
}
export default{
    //namespaced: true,
    state,
    getters,
    mutations,
    actions
}