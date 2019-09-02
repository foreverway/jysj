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
           //关于莫名其妙的学习币的设置
           learnmoney_list (params) {
            let url='/api/api_learnmoney_list'
            return shuju.getdata(url,params)
           },
           //关于福利钱包明细列表
           welfare_wallet_list (params) {
            let url='/api/api_welfare_wallet_list'
            return shuju.getdata(url,params)
           },
            //关于现金钱包明细列表
            cash_list (params) {
               let url='/api/api_cash_list'
               return shuju.getdata(url,params)
              },









}