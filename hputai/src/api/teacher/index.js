

import shuju from '../axios'

export default{
    teaching_data(params){  //授课数据列表接口
        let url='/api/api_teaching_data'
        return shuju.getdata(url,params)
    },
    teacher_list(params){  //教师课酬列表数据接口
        let url='/api/api_tdollars_list'
        return shuju.getdata(url,params)
    }
}