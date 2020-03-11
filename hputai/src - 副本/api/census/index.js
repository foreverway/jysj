

import shuju from  '../axios'

export default {
    subject_classhour(params) {
        let url = '/api/api_subject_classhour'
        return shuju.getdata(url, params)
      },

      subjects_ranking(params) { //三级科目TOP15排行，如果是选择天，周，月时间都传入开始和结束时间戳过来
        let url = '/api/api_subjects_ranking'
        return shuju.getdata(url, params)
      },
      student_classhour_ranking(params) { //学生课时T15排行
        let url = '/api/api_student_classhour_ranking'
        return shuju.getdata(url, params)
      },
      one_subjects_ranking(params) { //一级科目TOP15排行，如果是选择天，周，月时间都传入开始和结束时间戳过来
        //此处的params是用户的账户id，用于获取用户的信息
        let url = '/api/api_one_subjects_ranking'
        return shuju.getdata(url, params)
      },
      classteacher_classhour_ranking(params) { //班主任课时T15排行
        let url = '/api/api_classteacher_classhour_ranking'
        return shuju.getdata(url, params)
      },
      student_classhour(params) { //学生课时统计
        let url = '/api/api_student_classhour'
        return shuju.getdata(url, params)
      },
      yearonyear_classhour(params) { //获取上一个月和前一年上一个月
        let url = '/api/api_yearonyear_classhour'
        return shuju.getdata(url, params)
      },
      student_yearonyear_classhour(params) { //学生课时上一个月和前一年上月课时统计，第一组为去年上月，第二组为当年上月
        let url = '/api/api_student_yearonyear_classhour'
        return shuju.getdata(url, params)
      },
      chainratio_classhour(params) { //获取去年这个月，当前这个月和下课月排课数据，
        let url = '/api/api_chainratio_classhour'
        return shuju.getdata(url, params)
      },
      student_chainratio_classhour(params) { //获取去年这个月，当前这个月和下课月排课数据，
        let url = '/api/api_student_chainratio_classhour'
        return shuju.getdata(url, params)
      },
      get_parent_info(params) { //切换数据级数
        let url = '/api/api_get_parent_info'
        return shuju.getdata(url, params)
      },
      teacher_classhour(params) { //教师课时统计
        let url = '/api/api_teacher_classhour'
        return shuju.getdata(url, params)
      },
      teacher_classhour_proportion(params) { //全职与兼职的课时占比情况(%)
        let url = '/api/api_teacher_classhour_proportion'
        return shuju.getdata(url, params)
      },
      screen_teacher_classhour(params) { //全职与兼职的课时占比情况(%)
        let url = '/api/api_screen_teacher_classhour'
        return shuju.getdata(url, params)
      },
      
      onlevel_subject(params) { //一级科目表格数据
        let url = '/api/api_onlevel_subject'
        return shuju.getdata(url, params)
      },
            
      total_onlevel_subject(params) { //一级科目表格数据
        let url = '/api/api_total_onlevel_subject'
        return shuju.getdata(url, params)
      },
      
      profit_info(params) { //今年和去年12个月的毛利
        let url = '/api/api_profit_info'
        return shuju.getdata(url, params)
      },
      fulltime_yipai_classhour(params) { //全职老师已排课时统计
        let url = '/api/api_fulltime_yipai_classhour'
        return shuju.getdata(url, params)
      },
      fulltime_upper_classhour(params) { //全职老师已上课时统计
        let url = '/api/api_fulltime_upper_classhour'
        return shuju.getdata(url, params)
      },
      fulltime_yipai_complete(params) { //全职教师已排课时目标完成度
        let url = '/api/api_fulltime_yipai_complete'
        return shuju.getdata(url, params)
      },
      fulltime_upper_complete(params) { //全职教师已上课时目标完成度
        let url = '/api/api_fulltime_upper_complete'
        return shuju.getdata(url, params)
      },
      
      business_system(params) { //业务核算—-业务体系列表
        let url = '/api/api_business_system'
        return shuju.getdata(url, params)
      },
      
           
      system_dimension(params) { //业务核算—-体系维度分析
        let url = '/api/api_system_dimension'
        return shuju.getdata(url, params)
      },
           
      student_dimension(params) { //业务核算—-学生维度分析
        let url = '/api/api_student_dimension'
        return shuju.getdata(url, params)
      },
}