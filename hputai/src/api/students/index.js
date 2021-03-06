import shuju from '../axios'

export default {
         //获取学员列表 /api_students_list
         students_list (params) {
            let url='/api/api_students_list'
            return shuju.getdata(url,params)
           },

           //排课列表接口
           student_arranging_course(params){
             let url="/api/api_arranging_course"
             return shuju.getdata(url,params)
           }, 

                    //查看学生课表 
         see_students_class (params) {
          let url='/api/api_getstudent_course'
          return shuju.getdata(url,params)
         },
           //学生数据接口
            get_students_data (params) {
          let url='/api/api_students_data'
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
           //编辑获取学员信息 
           students_edit (params) {
            let url='/api/api_students_edit'
            return shuju.getdata(url,params)
           },
          //查看详情获取学员信息 
          info_students_edit (params) {
            let url='/api/api_students_base'
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
          
                // 检查学生姓名
  ifusername (params) {
   let url = '/api/api_recharge_check'
   return shuju.getdata(url, params)
 },// 检查学员手机号和用户名
 ifuserphone (parms) {
   let url = '/api/api_students_check'
 
   return shuju.getdata(url, parms)
 },
   // 检查剩余学习币余额 
   user_learnmoney (parms) {
      let url = '/api/pc_user_learnmoney'
      return shuju.postdata(url, parms)
    },
      // 现金钱包列表
  cash_list (parms) {
   let url = '/api/api_cash_list'
   return shuju.getdata(url, parms)
 },
 // 学习币明细 
 learnmoney_list (parms) {
   let url = '/api/api_learnmoney_list'
   return shuju.getdata(url, parms)
 },
 // 福利钱包入款扣款 
 wallet_balance (parms) {
   let url = '/api/api_welfare_wallet_balance'
   return shuju.postdata(url, parms)
 },
 // 福利钱包明细列表
 wallet_list (parms) {
   let url = '/api/api_welfare_wallet_list'
   return shuju.getdata(url, parms)
 },
    
   // 考勤列表接口
   attendance_list (params) {
    let url='/api/api_attendance_list'
    return shuju.getdata(url,params)
   },
      // 学生新日历课表列表
      student_course_count (params) {
        let url='/api/api_student_course_count'
        return shuju.getdata(url,params)
       },
          // 学生新日历课表详情
          student_course_info (params) {
    let url='/api/api_student_course_info'
    return shuju.getdata(url,params)
   },
   // ------------------------------公共方法---------------------------------------------------------
  // 读取url上的参数
  getuilcode () {
   let admin_id = this.getQueryString('admin_id')

   let admin_name = this.getQueryString('admin_name')

   if (!!admin_id || !!admin_name) {
     // 设置缓存
     var d = new Date()
     d.setTime(d.getTime() + (2 * 3600000))
     var expires = 'expires=' + d.toGMTString()
     document.cookie = 'admin_name=' + admin_name + ';' + expires
     document.cookie = 'admin_id=' + admin_id + ';' + expires
   }
 },

 // 获取url的值
 getQueryString (value) {
   const reg = new RegExp('(^|&)' + value + '=([^&]*)(&|$)')
   const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg)
   if (r != null) {
     return decodeURIComponent(r[2])
   }
 }
}