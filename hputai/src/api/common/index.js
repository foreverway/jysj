import shuju from '../axios'

export default {
  //获取菜单 /api_menu_list
  menu_list(params) {
    //此处的params是用户的账户id，用于获取用户的信息
    let url = '/api/api_menu_list'
    return shuju.getdata(url, params)
  },
  //省市数据  /api_region_list
  region_list(params) {
    let url = '/api/api_region_list'
    return shuju.getdata(url, params)
  },

  // 顾问数据 /api_adviser_list
  adviser_list(params) {
    let url = '/api/api_adviser_list'
    return shuju.getdata(url, params)
  },
    // 添加人数据 /api_adviser_list
    inpeople_list(params) {
      let url = '/api/api_inpeople_list'
      return shuju.getdata(url, params)
    },
  // 班主任数据 
  banzhuren_list(params) {
    let url = '/api/api_banzhuren_list'
    return shuju.getdata(url, params)
  },
  //销售进程管控列表
  salepro_list(params) {
    let url = '/api/api_salepro_list'
    return shuju.getdata(url, params)
  },
  //添加销售情况表
  salepro_add(params) {
    let url = '/api/api_salepro_add'
    return shuju.postdata(url, params)
  },
  //删除销售情况表
  salepro_del(params) {
    let url = '/api/api_salepro_del'
    return shuju.deletedata(url, params)
  },
  //编辑时获取销售情况表
  salepro_edit(params) {
    let url = '/api/api_salepro_edit'
    return shuju.getdata(url, params)
  },
  //编辑后提交数据
  salepro_edit_put(params) {
    let url = '/api/api_salepro_edit'
    return shuju.putdata(url, params)
  },
  //获取编辑科目配置列表 /api_subject_list
  subject_list(params) {
    let url = '/api/api_subject_list'
    return shuju.getdata(url, params)
  },
  // 添加报名需求列表 /api_application_add
  application_add(params) {
    let url = '/api/api_application_add'
    return shuju.postdata(url, params)
  },
  //获取报名需求表
  application_list(params) {
    let url = "/api/api_application_list"
    return shuju.getdata(url, params)
  },
    //查看报名表接口
    get_application(params) {
      let url = "/api/api_get_application"
      return shuju.getdata(url, params)
    },
        //查看报名表接口
        get_needs(params) {
          let url = "/api/api_get_needs"
          return shuju.getdata(url, params)
        },
  ///api_adviser_list获取课程顾问列表
  adviser_list(params) {
    let url = "/api/api_adviser_list"
    return shuju.getdata(url, params)
  },

  ///api_application_arrange  报名需求排课获取数据
  application_arrange(params) {
    let url = "/api/api_application_arrange"
    return shuju.getdata(url, params)
  },
  
  ///api_application_arrange  报名需求排课提交数据接口
  application_arrange_put(params) {
    let url = "/api/api_application_arrange"
    return shuju.putdata(url, params)
  },

  ///  报名需求 编辑排课获取数据接口
  arrange_edit(params) {
    let url = "/api/api_arrange_edit"
    return shuju.getdata(url, params)
  },

  // 编辑报名需求提交保存数据接口
  application_edit_put(params) {
    let url = "/api/api_application_edit"
    return shuju.putdata(url, params)
  },
//获取课表详情信息接口
class_transfer_info(params) {
  let url = "/api/api_class_transfer_info"
  return shuju.getdata(url, params)
},
  application_audit(params) { //排课审核
    let url = "/api/api_application_audit"
    return shuju.postdata(url, params)
  },

  application_arrange_post(params) { //报名需求排课提交数据
    let url = "/api/api_application_arrange"
    return shuju.postdata(url, params)
  },
  student_course(params) { //获取学生课表（待上/已上）接口
    let url = "/api/api_student_course"
    return shuju.getdata(url, params)
  },
  enter_classroom(params) { //直播进入教室
    let url = "/api/api_enter_classroom"
    return shuju.getdata(url, params)
  },

  feedback_add(params) { //获取课表反馈数据
    let url = "/api/api_feedback_add"
    return shuju.getdata(url, params)
  },

  post_feedback_add(params) { //提交课表反馈数据
    let url = "/api/api_feedback_add"
    return shuju.postdata(url, params)
  },

  edit_feedback_add(params) { //编辑课表反馈数据
    let url = "/api/api_feedback_edit"
    return shuju.putdata(url, params)
  },


  course_feedback(params) { //查看课堂反馈
    let url = "/api/api_course_feedback"
    return shuju.getdata(url, params)
  },

  other_enter(params) { //其他方式进入教室教室接口
    let url = "/api/api_other_enter"
    return shuju.getdata(url, params)
  },

  //考勤操作（添加考勤记录/api_attendance_add
  attendance_add(params) {
    let url = "/api/api_attendance_add"
    return shuju.postdata(url, params)
  },

  //编辑提交考勤数据
  attendance_edit(params) {
    let url = "/api/api_attendance_edit"
    return shuju.putdata(url, params)
  },
  //编辑提交调课
  course_transfer(params) {
    let url = "/api/api_course_transfer"
    return shuju.postdata(url, params)
  },
  attendance_details(params) { //查看详情
    let url = "/api/api_attendance_details"
    return shuju.getdata(url, params)
  },

  teacher_list_only(params) { //老师列表
    let url = "/api/api_teacher_list"
    return shuju.getdata(url, params)
  },

  teacher_dollars_get(params) { //老师课酬获取数据
    let url = "/api/api_teacher_dollars"
    return shuju.getdata(url, params)
  },

  teacher_dollars_post(params) { //教师课酬设置提交数据
    let url = "/api/api_teacher_dollars"
    return shuju.postdata(url, params)
  },

  teacher_edit_put(params) { //编辑教师提交数据
    let url = "/api/api_teacher_edit"
    return shuju.putdata(url, params)
  },

  teacher_edit_get(params) { //编辑教师获取数据接口
    let url = "/api/api_teacher_edit"
    return shuju.getdata(url, params)
  },

  recharge_list(params) { //获取充值记录单列表
     let url = "/api/api_recharge_list"
    return shuju.getdata(url, params)
  },

  // inpeople_list(params) { //实收人数据接口
  //   let url = "/api/api_inpeople_list"
  //   return shuju.getdata(url, params)
  // },

  basedata_list(params) { //基础数据配置
    let url = "/api/api_basedata_list"
    return shuju.getdata(url, params)
  },

  basedata_list_post(params) { //新增数据,删除数据-pos
    let url = "/api/api_basedata"
    return shuju.getdata(url, params)
  },

  recharge_edit(params) { //编辑充值记录单获取数据
    let url = "/api/api_recharge_edit"
    return shuju.getdata(url, params)
  },

  recharge_export_table(params) { //导出充值记录信息表
    let url = "/api/api_recharge_export"
    return shuju.getdata(url, params)
  },

  recharge_audit(params) { //审核充值记录单
    let url = "/api/api_recharge_audit"
    return shuju.postdata(url, params)
  },

  recharge_update(params) { //更新充值记录单提交数据
    let url = "/api/api_recharge_update"
    return shuju.putdata(url, params)
  },

  user_recharge_list(params) { //获取用户充值未关联充值记录单的数据接口
    let url = "/api/api_user_recharge_list"
    return shuju.getdata(url, params)
  },

  share_list(params) { //分享记录列表
    let url = "/api/api_share_list"
    return shuju.getdata(url, params)
  },

  del_share(params) { //删除分享素材列表的数据接口
    let url = "/api/api_del_share"
    return shuju.deletedata(url, params)
  },

  share_record_list(params) { //分享记录列表接口
    let url = "/api/api_share_record_list"
    return shuju.getdata(url, params)
  },

  share_config_list(params) { //获取配置的分享素材
    let url = "/api/api_share_config_list"
    return shuju.getdata(url, params)
  },

  del_share_config(params) { //删除分享素材列表的数据接口
    let url = "/api/api_del_share_config"
    return shuju.deletedata(url, params)
  },

  edit_share_config(params) { //编辑分享素材配置获取数据
    let url = "/api/api_edit_share_config"
    return shuju.getdata(url, params)
  },

  save_share_config(params) { //保存编辑分享素材配置的数据接口
    let url = "/api/api_save_share_config"
    return shuju.putdata(url, params)
  },

  add_share(params) { //添加分享素材列表数据接口
    let url = "/api/api_add_share"
    return shuju.postdata(url, params)
  },

  user_list(params) { //获取学员账户接口
    let url = "/api/api_user_list"
    return shuju.getdata(url, params)
  },

  recharge_check(params) { //检查学生姓名
    let url = "/api/api_recharge_check"
    return shuju.getdata(url, params)
  },

  recharge_add(params) { //新增充值记录单
    let url = "/api/api_recharge_add"
    return shuju.postdata(url, params)
  },

  add_share_config(params) { //分享素材配置接口
    let url = "/api/api_add_share_config"
    return shuju.postdata(url, params)
  },

  carryforward(params) { //考勤异常的时候结转接口
    let url = "/api/api_carryforward"
    return shuju.postdata(url, params)
  },

  evaluation_list(params) { //教师评价列表接口
    let url = "/api/api_evaluation_list"
    return shuju.getdata(url, params)
  },

  user_recharge_list(params) { //获取用户充值未关联充值记录单的数据
    let url = "/api/api_user_recharge_list"
    return shuju.getdata(url, params)
  },

  teacher_evaluation(params){ //评价教师提交数据
    let url ="/api/api_teacher_evaluation"
    return shuju.postdata(url,params)
  },
  
  teacher_evaluation_get(params){ //获取教师的评价数据
    let url ="/api/api_teacher_evaluation"
    return shuju.getdata(url,params)
  },
   // 获取直播平台数据 /api_live_list
   get_live_list (params) {
    let url='/api/api_live_list'
    return shuju.getdata(url,params)
   },
}
