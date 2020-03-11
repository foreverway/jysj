

import shuju from '../axios'

export default{
    teaching_data(params){  //授课数据列表接口
        let url='/api/api_teaching_data'
        return shuju.getdata(url,params)
    },
    teacher_list(params){  //教师课酬列表数据接口
        let url='/api/api_tdollars_list'
        return shuju.getdata(url,params)
    },
    teacher_course_info(params){  //老师新日历课表详情
        let url='/api/api_teacher_course_info'
        return shuju.getdata(url,params)
    }, //teacher_id
    teacher_course_count(params){  //老师新日历课表列表
        let url='/api/api_teacher_course_count'
        return shuju.getdata(url,params)
    }//teacher_id
}