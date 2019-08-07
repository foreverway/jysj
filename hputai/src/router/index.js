import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 后台用户路由
import Login from '@/components/menber/login'
import MainIndex from '@/components/menber/index' 
import AdminList from '@/components/menber/admin_list' 
import AdminAdd from '@/components/menber/admin_add' 
import AdminEdit from '@/components/menber/admin_edit'
//操作
import AddLink from '@/components/operation/addlink'
import ApplicationAdd from '@/components/operation/application_add'
import SalesList from '@/components/operation/sale_list.vue'
import Addsalepro from '@/components/operation/addsalepro'
//学生路由
import StudentsAdd from '@/components/students/students_add'
import StudentsEdit from '@/components/students/students_edit'
import StudentsList from '@/components/students/StudentsList'
import StudentClass from '@/components/students/StudentClass'

import ClassMain from '@/components/students/ClassMain'

import StudentMoneyMain from '@/components/students/StudentMoneyMain'
//系统设置路由
import SystemMain from '@/components/system/system_main'
//系统设置
import SysBase from '@/components/system/sys_base'
// 系统短信配置
import SysSms from '@/components/system/sys_sms'
// 系统直播配置
import LiveList from '@/components/system/live_list'
import LiveAdd from '@/components/system/live_add'
import LiveEdit from '@/components/system/live_edit'
//系统科目设置
import SubjectList from '@/components/system/subject_list'
import SubjectAdd from '@/components/system/subject_add'
import SubjectEdit from '@/components/system/subject_edit'

//系统基础数据配置
import Base from '@/components/system/base'

//角色管理
import RoleList from '@/components/menber/role_list' 
import RoleAdd from '@/components/menber/role_add'
import RoleEdit from '@/components/menber/role_edit'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/',
          component: MainIndex
        },
        {
          path: '/ApplicationAdd',//ApplicationAdd
          component: ApplicationAdd
        },
        {
          path: '/AddLink',//
          component: AddLink
        },
        {
          path: '/Addsalepro',//
          component: Addsalepro
        },
        {
          path: '/SalesList',//
          component:SalesList
        },
        {
          path: '/StudentsAdd',  //
          component: StudentsAdd
        },
        {
          path: '/StudentsEdit/:id',  //StudentsEdit
          component: StudentsEdit
        },
        {
          path: '/StudentsList',
          component: StudentsList
        },
        {
          path: '/AdminList',
          component: AdminList
        },
        {
          path: '/AdminAdd',
          component: AdminAdd
        },
        {
          path: '/AdminEdit/:id',
          component: AdminEdit
        },
        {
          path: '/SubjectList', //科目配置 
          component: SubjectList
        },
        {
          path: '/SubjectAdd', //科目配置  
          component: SubjectAdd
        },
        {
          path: '/SubjectEdit/:id', //科目配置  
          component: SubjectEdit
        },
        {
          path: '/Base', //基础数据配置  
          component: Base
        },
        {
          path: '/SystemMain', // 系统设置 
          component: SystemMain,
          children:[
            {
              path: '/SystemMain',
              component: SysBase
            },
            {
              path: '/SysSms',
              component: SysSms
            },
            {
              path: '/LiveList',
              component: LiveList
            },
            {
              path: '/LiveAdd',
              component: LiveAdd
            },
            {
              path: '/LiveEdit/:id',
              component: LiveEdit
            },
            {
              path: '/RoleList',
              component: RoleList
            },
            {
              path: '/RoleAdd',
              component: RoleAdd
            },
            {
              path: '/RoleEdit/:id',
              component: RoleEdit
            },
          ]
        },
    
        {
          path: '/ClassMain',// 学生课表 
          component: ClassMain,
          children: [
            {
              path: '/',
              component: StudentClass
            },
          ]
        },

        {
          path: '/StudentMoneyMain', // 学生充值记录
          component: StudentMoneyMain
        },
      
      ]
    }  
  ]
})
