import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
// 后台用户路由
import Login from '@/components/menber/login'
import MainIndex from '@/components/menber/index' 
import AdminList from '@/components/menber/admin_list' 
import AdminAdd from '@/components/menber/admin_add' 
import AdminEdit from '@/components/menber/admin_edit'
//操作
import AddLink from '@/components/operation/addlink'
import ApplicationAdd from '@/components/operation/application_add'  //添加报名需求列表
import ApplicationEdit from '@/components/operation/application_edit'  //编辑报名需求列表
import SalesList from '@/components/operation/sale_list.vue'
import SalelistEdit from '@/components/operation/salelist_edit.vue'
import Addsalepro from '@/components/operation/addsalepro'
import ApplyNeedsList from '@/components/operation/applyNeedsList'  //报名需求列表
import PlanClassAdd from '@/components/operation/PlanClassAdd'  //新添加排课
import CheckWork from '@/components/operation/CheckWork'  //考勤
import RechargeRecord from '@/components/operation/RechargeRecord'  //充值记录单
import Rechargecreate from '@/components/operation/recharge_create'  //充值记录单
import EditRecharge from '@/components/operation/edit_recharge'  //充值记录单

//学生路由
import StudentsAdd from '@/components/students/students_add'
import StudentsEdit from '@/components/students/students_edit'
import StudentsList from '@/components/students/StudentsList'
import StudentClass from '@/components/students/StudentClass'
import ClassMain from '@/components/students/ClassMain'
import StudentMoneyMain from '@/components/students/StudentMoneyMain'  //学生钱包在这里
import NewMoney from '@/components/students/NewMoney'
import VirtualMonney from '@/components/students/VirtualMonney'
import LearningMoney from '@/components/students/LearningMoney'
//师资管理
import TeacherAssess from '@/components/teacher/TeacherAssess'  //老师评价
import TeacherList from '@/components/teacher/TeacherList'  //老师列表
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
      name: 'Menu',
      component: Menu,
      children: [
        {
          path: '/',
          component: MainIndex
        },
        {
          path: '/ApplicationAdd',//ApplicationAdd添加报名需求列表
          component: ApplicationAdd
        },
        {
          path: '/ApplicationEdit',//ApplicationEdit编辑报名需求列表
          component: ApplicationEdit
        },
        {
          path: '/ApplyNeedsList',//ApplyNeedsList添加报名需求列表
          component: ApplyNeedsList
        },
        {
          path: '/PlanClassAdd',//PlanClassAdd添加报名需求列表
          component: PlanClassAdd
        },
        {
          path: '/RechargeRecord',//RechargeRecord充值记录单
          component: RechargeRecord
        },
        {
          path: '/Rechargecreate',//Rechargecreate添加记录单
          component: Rechargecreate
        },
        {
          path: '/EditRecharge',//EditRecharge编辑充值记录单
          component: EditRecharge
        },
        {
          path: '/CheckWork',//CheckWork  考勤
          component: CheckWork
        },
        {
          path: '/TeacherAssess',//TeacherAssess  老师评价
          component: TeacherAssess
        },
        {
          path: '/TeacherList',//TeacherList  老师列表
          component: TeacherList
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
          path: '/SalelistEdit',  //
          component: SalelistEdit
        },
        {
          path: '/StudentsEdit',  //StudentsEdit
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
          path: '/SubjectAdd', //科目添加  
          component: SubjectAdd
        },
        {
          path: '/SubjectEdit/:id', //科目编辑
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
          component: StudentMoneyMain,
          children:[
            {
              path:'/VirtualMonney',
              component:VirtualMonney
            },
            {
              path:'/NewMoney',
              component:NewMoney
            },
            {
              path:'/LearningMoney',
              component:LearningMoney
            }
          ]
        },
      
      ]
    }  
  ]
})
