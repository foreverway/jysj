

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
      one_subjects_ranking(params) { //一级科目TOP15排行，如果是选择天，周，月时间都传入开始和结束时间戳过来
        //此处的params是用户的账户id，用于获取用户的信息
        let url = '/api/api_one_subjects_ranking'
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
      chainratio_classhour(params) { //获取去年这个月，当前这个月和下课月排课数据，
        let url = '/api/api_chainratio_classhour'
        return shuju.getdata(url, params)
      },
      get_parent_info(params) { //切换数据级数
        let url = '/api/api_get_parent_info'
        return shuju.getdata(url, params)
      },
}