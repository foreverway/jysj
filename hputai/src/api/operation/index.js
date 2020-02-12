import shuju from '../axios'

export default {
       // 添加报名需求列表 /api_application_add
    application_add (params) {
    let url='/api/api_application_add'
    return shuju.postdata(url,params)
   },
   //查看老师课表
   teacher_course(params){
    let url='/api/api_teacher_course'
    return shuju.getdata(url,params)
   },
      //战队负责人列表
      team_leader(params){
         let url='/api/api_team_leader'
         return shuju.getdata(url,params)
        },
      //班主任顾问列表
      banzhuren_list(params){
   let url='/api/api_banzhuren_list'
   return shuju.getdata(url,params)
   },
}