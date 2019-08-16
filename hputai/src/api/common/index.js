import shuju from '../axios'

export default {
      //获取菜单 /api_menu_list
      menu_list (params) {
        //此处的params是用户的账户id，用于获取用户的信息
    let url='/api/api_menu_list'
    return shuju.getdata(url,params)
   },
   //省市数据  /api_region_list
   region_list (params) {
    let url='/api/api_region_list'
    return shuju.getdata(url,params)
   },
   //班主任数据 /api_banzhuren_list
   banzhuren_list (params) {
    let url='/api/api_banzhuren_list'
    return shuju.getdata(url,params)
   },
   // 顾问数据 /api_adviser_list
   adviser_list (params) {
    let url='/api/api_adviser_list'
    return shuju.getdata(url,params)
   },
   //销售进程管控列表
   salepro_list (params) {
    let url='/api/api_salepro_list'
    return shuju.getdata(url,params)
   },
   //添加销售情况表
   salepro_add (params) {
    let url='/api/api_salepro_add'
    return shuju.postdata(url,params)
   },
   //删除销售情况表
   salepro_del(params) {
    let url='/api/api_salepro_del'
    return shuju.deletedata(url,params)
   },
   //编辑时获取销售情况表
   salepro_edit(params) {
    let url='/api/api_salepro_edit'
    return shuju.getdata(url,params)
   },
   //编辑后提交数据
   salepro_edit_put(params) {
    let url='/api/api_salepro_edit'
    return shuju.getdata(url,params)
   },
   //获取编辑科目配置列表 /api_subject_list
   subject_list (params) {
    let url='/api/api_subject_list'
    return shuju.getdata(url,params)
   },
   application_add (params) {
    let url='/api/api_application_add'
    return shuju.postdata(url,params)
   },   // 添加报名需求列表 /api_application_add

}