
import shuju from '../axios'

export default {
  //登录
  login (params) {
   let url='/api/api_admin_login'
   return shuju.postdata(url,params)
  },
  // 忘记密码 /api_change_pass
  change_pass (params) {
    let url='/api/api_change_pass'
    return shuju.postdata(url,params)
   },
   // 获取短信验证码 /api_send_code
   send_code (params) {
    let url='/api/api_send_code'
    return shuju.postdata(url,params)
   },
  //检验手机号是否存在 /api/api_check_tel
  check_tel (params) {
   let url='/api/api_check_tel'
   return shuju.getdata(url,params)
  },
  //获取后台账户列表 /api/api_admin_list
  admin_list (params) {
   let url='/api/api_admin_list'
   return shuju.getdata(url,params)
  },
  // 新建后台账户 /api/api_admin_add
  admin_add (params) {
    let url='/api/api_admin_add'
    return shuju.postdata(url,params)
   },
   // 删除后台账户 /api/api_admin_del
   admin_del (params) {
    let url='/api/api_admin_del'
    return shuju.deletedata(url,params)
   },
   // 编辑后台账户 /api/api_admin_edit
   admin_edit (params) {
    let url='/api/api_admin_edit'
    return shuju.getdata(url,params)
   },
   // 编辑后台账户提交数据 /api/api_admin_edit
   admin_edit_put (params) {
    let url='/api/api_admin_edit'
    return shuju.putdata(url,params)
   },
   //获取账户角色列表 /api/api_role_list
   role_list (params) {
    let url='/api/api_role_list'
    return shuju.getdata(url,params)
   },
   //新建账户角色 /api/api_role_add
   role_add (params) {
    let url='/api/api_role_add'
    return shuju.postdata(url,params)
   },
   // 编辑角色获取数据 /api_role_edit
   role_edit(params) {
    let url='/api/api_role_edit'
    return shuju.getdata(url,params)
   },
 // 编辑角色保存数据 /api_role_edit
      role_edit_put(params) {
        let url='/api/api_role_edit'
        return shuju.putdata(url,params)
       },
   // 删除角色 /api_role_del
   role_del (params) {
    let url='/api/api_role_del'
    return shuju.deletedata(url,params)
   },
   //报名需求表删除
   application_del(params){
    let url='/api/api_application_del'
    return shuju.deletedata(url,params)
   },
   application_operate(params) {    //报名需求确认
    let url='/api/api_application_operate'
    return shuju.postdata(url,params)
   },
   application_edit(params) {    //编辑报名需求获取信息
    let url='/api/api_application_edit'
    return shuju.getdata(url,params)
   },
   look_arrange(params){         //获取排课信息
     let url='/api/api_look_arrange'
     return shuju.getdata(url,params)
   }
}