import shuju from '../axios'

export default {
      //获取系统设置信息 /api_sys_base
      sys_base (params) {
    let url='/api/api_sys_base'
    return shuju.getdata(url,params)
   },
   // 更新系统配置信息 /api_sys_base
   post_sys_base (params) {
    let url='/api/api_sys_base'
    return shuju.postdata(url,params)
   },
   // 获取短信配置 /api_sys_sms
   sys_sms (params) {
    let url='/api/api_sys_sms'
    return shuju.getdata(url,params)
   },
   // post短信配置
   post_sys_sms (params) {
    let url='/api/api_sys_sms'
    return shuju.postdata(url,params)
   },
   // 获取直播平台数据 /api_live_list
  //  live_list (params) {
  //   let url='/api/api_live_list'
  //   return shuju.getdata(url,params)
  //  },
      //班主任数据 /api_banzhuren_list
      // banzhuren_list (params) {
      //   let url='/api/api_banzhuren_list'
      //   return shuju.getdata(url,params)
      //  },
   //添加直播平台 /api_live_add
   live_add (params) {
    let url='/api/api_live_add'
    return shuju.postdata(url,params)
   },
   //编辑直播获取数据 /api_live_edit
   live_edit (params) {
    let url='/api/api_live_edit'
    return shuju.getdata(url,params)
   },
   // 删除直播获取数据  /api_live_del
   live_del (params) {
    let url='/api/api_live_del'
    return shuju.deletedata(url,params)
   },
   //提交编辑获取数据 /api_live_edit
   put_live_edit (params) {
    let url='/api/api_live_edit'
    return shuju.putdata(url,params)
   },


   // 添加编辑获取上级科目数据 /api_subject_plist
   subject_plist (params) {
    let url='/api/api_subject_plist'
    return shuju.getdata(url,params)
   },
   // 添加科目配置 /api_subject_add
   subject_add (params) {
    let url='/api/api_subject_add'
    return shuju.postdata(url,params)
   },

   // 获取编辑科目配置 /api_subject_edit
   subject_edit (params) {
    let url='/api/api_subject_edit'
    return shuju.getdata(url,params)
   },

   //  提交编辑科目设置数据 /api_subject_edit
   put_subject_edit (params) {
    let url='/api/api_subject_edit'
    return shuju.putdata(url,params)
   },
   // 删除科目设置 /api_subject_del
   subject_del (params) {
    let url='/api/api_subject_del'
    return shuju.deletedata(url,params)
   },
   // 获取基础数据配置 /api_basedata_list
   basedata_list (params) {
    let url='/api/api_basedata_list'
    return shuju.getdata(url,params)
   },
   //删除添加基础数据配置
   post_basedata (params) {
    let url='/api/api_basedata'
    return shuju.postdata(url,params)
   },
}