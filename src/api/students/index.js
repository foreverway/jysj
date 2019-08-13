import shuju from '../axios'

export default {
         //获取学员列表 /api_students_list
         students_list (params) {
            let url='/api/api_students_list'
            return shuju.getdata(url,params)
           },

           //添加学员  /api_students_add
           students_add (params) {
            let url='/api/api_students_add'
            return shuju.postdata(url,params)
           },

           // 检查学员手机号和用户名  /api_students_check
           students_check (params) {
            let url='/api/api_students_check'
            return shuju.getdata(url,params)
           },
           //编辑获取学员信息 /api_students_edit
           students_edit (params) {
            let url='/api/api_students_edit'
            return shuju.getdata(url,params)
           },
           //提交编辑
           put_students_edit (params) {
            let url='/api/api_students_edit'
            return shuju.putdata(url,params)
           },

           //删除学员信息  /api_students_del
           students_del (params) {
            let url='/api/api_students_del'
            return shuju.deletedata(url,params)
           },










}