import shuju from '../axios'

export default {
       // 添加报名需求列表 /api_application_add
    application_add (params) {
    let url='/api/api_application_add'
    return shuju.postdata(url,params)
   },
   //刷新出已经添加的列表
  
}