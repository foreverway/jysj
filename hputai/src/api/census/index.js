

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
        //此处的params是用户的账户id，用于获取用户的信息
        let url = '/api/api_student_classhour'
        return shuju.getdata(url, params)
      },
}