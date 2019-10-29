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
   }

}