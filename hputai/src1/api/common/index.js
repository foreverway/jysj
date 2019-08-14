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
   salepro_add (params) {
    let url='/api/api_salepro_add'
    return shuju.postdata(url,params)
   },
   salepro_del(params) {
    let url='/api/api_salepro_del'
    return shuju.deletedata(url,params)
   },
}