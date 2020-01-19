

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

}