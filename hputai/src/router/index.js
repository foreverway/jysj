import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: resolve=>require(['@/components/menber/login'],resolve)
    },
    {
      path: '/',
      name: 'Menu',
      component: resolve=>require(['@/components/Menu'],resolve),
      children: [
        {
          path: '/',
          component: resolve=>require(['@/components/menber/index'],resolve)
        },
        // {
        //   path: '/ApplicationAdd',//ApplicationAdd添加报名需求列表
        //   component: resolve=>require(['@/components/operation/application_add'],resolve),
        //   name:'ApplicationAdd'
        // },
        {
          path: 'ApplyNeedsList/ApplicationEdit',//ApplicationEdit编辑报名需求列表
          component: resolve=>require(['@/components/operation/application_edit'],resolve)
        },
        {
          path: 'ApplyNeedsList/ClassEdit',//编辑排课
          component:resolve=>require(['@/components/operation/ClassEdit'],resolve)
        },
        {
          path: '/ApplyNeedsList',//ApplyNeedsList添加报名需求列表
          component: resolve=>require(['@/components/operation/applyNeedsList'],resolve),
          name:'ApplyNeedsList'
        },
        {
          path: 'ApplyNeedsList/PlanClassAdd',//PlanClassAdd添加报名需求列表
          component: resolve=>require(['@/components/operation/PlanClassAdd'],resolve),
          name:'PlanClassAdd'
        },
        {
          path: '/RechargeRecord',//RechargeRecord充值记录单
          component: resolve=>require(['@/components/operation/RechargeRecord'],resolve)
        },
        {
          path: '/RechargeRecord/Rechargecreate',//Rechargecreate添加记录单
          component: resolve=>require(['@/components/operation/recharge_create'],resolve)
        },
        {
          path: '/RechargeRecord/EditRecharge',//EditRecharge编辑充值记录单
          component: resolve=>require(['@/components/operation/edit_recharge'],resolve)
        },
        {
          path: '/CheckWork',//CheckWork  考勤
          component: resolve=>require(['@/components/operation/CheckWork'],resolve)
        },
        {
          path: '/TeacherAssess',//TeacherAssess  老师评价
          component:resolve=>require(['@/components/teacher/TeacherAssess'],resolve),
          // children:[
 
          // ]
        },
        {
          path: '/AchievementCensus',//业绩统计
          component:resolve=>require(['@/components/Statistics/AchievementCensus'],resolve),

        },
        {
          // path: '/ToAssessTeacher/:id',//ToAssessTeacher  [评价老师]
           path: '/TeacherAssess/ToAssessTeacher',
           name:"ToAssessTeacher",
           component: resolve=>require(['@/components/teacher/ToAssessTeacher'],resolve)
         },
        {
          path: '/TeacherList',//TeacherList  老师列表
          component: resolve=>require(['@/components/teacher/TeacherList'],resolve)
        },
        {
          path: '/TeacherData',//TeacherData  老师列表
          component: resolve=>require(['@/components/teacher/TeacherData'],resolve)
        },

        {
           path: '/TeacherSalary',//TeacherSalary  [教师课酬列表数据接口]
           name:"TeacherSalary",
           component: resolve=>require(['@/components/teacher/TeacherSalary'],resolve)
         },
        {
          path: '/AddLink',//
          component:resolve=>require(['@/components/operation/addlink'],resolve)
        },
        {
          path: '/SalesList/Addsalepro',//
          component: resolve=>require(['@/components/operation/addsalepro'],resolve)
        },
        {
          path: '/SalesList',//
          component:resolve=>require(['@/components/operation/sale_list'],resolve)
        },

        {
          path: '/SalesList/SalelistEdit',  //
          component: resolve=>require(['@/components/operation/salelist_edit.vue'],resolve)
        },
        {
          path: '/StudentsList/StudentsInfo',  //查看学生详情
          name:'StudentsInfo',
          component: resolve=>require(['@/components/students/StudentsInfo'],resolve),
          children:[
            {
              path:'VirtualMonney',
              component:resolve=>require(['@/components/students/VirtualMonney'],resolve)
            },
            {
              path:'NewMoney',
              component:resolve=>require(['@/components/students/NewMoney'],resolve)
            },
            {
              path:'LearningMoney',
              component:resolve=>require(['@/components/students/LearningMoney'],resolve)
            }
          ]
        },
        {
          path: '/StudentsList/ApplicationAdd',//ApplicationAdd添加报名需求列表
          component: resolve=>require(['@/components/operation/application_add'],resolve),
          name:'ApplicationAdd'
        },
        {
          path: '/StudentsList/application_edit_copy',//编辑页面
          component: resolve=>require(['@/components/operation/application_edit_copy'],resolve),
          name:'ApplicationAdd'
        },
        {
          path: '/StudentsList/StudentsEdit',  //学生编辑
          component:resolve=>require(['@/components/students/students_edit'],resolve)
        },
        {
          path: '/StudentsList/StudentsAdd',  //新建学生账号
          name:'StudentsAdd',
          component: resolve=>require(['@/components/students/students_add'],resolve)
        },
        {
          path: '/StudentsList',
          component:resolve=>require(['@/components/students/StudentsList'],resolve),
          name:'StudentsList',
        },
        {
          path: '/AdminList',
          component: resolve=>require(['@/components/menber/admin_list'],resolve)
        },
        {
          path: '/AdminList/AdminAdd',
          component: resolve=>require(['@/components/menber/admin_add'],resolve)
        },
        {
          path: '/AdminList/AdminEdit/:id',
          component: resolve=>require(['@/components/menber/admin_edit'],resolve)
        },
        {
          path: '/SubjectList', //科目配置 
          component: resolve=>require(['@/components/system/subject_list'],resolve)
        },
        {
          path: '/SubjectList/SubjectAdd', //科目添加  
          component: resolve=>require(['@/components/system/subject_add'],resolve)
        },
        {
          path: '/SubjectList/SubjectEdit/:id', //科目编辑
          component: resolve=>require(['@/components/system/subject_edit'],resolve)
        },
        {
          path: '/Base', //基础数据配置  
          component: resolve=>require(['@/components/system/base'],resolve)
        },
        {
          path: '/Share',
          name: 'Share',
          component: resolve=>require(['@/components/operation/Share'],resolve),
          children: [
            {
              path: '/Share',
              component: resolve=>require(['@/components/operation/share_page/share_list'],resolve)
            },
            {
              path: '/AddDelmonney',
              component: resolve=>require(['@/components/operation/share_page/add_del_money'],resolve)
            },
            {
              path: '/ShareRules',
              component: resolve=>require(['@/components/operation/share_page/share_rules'],resolve)
            },
            {
              path: 'ShareArticleConfig',
              name: 'ShareArticleConfig',
              component: resolve=>require(['@/components/operation/share_page/share_article_config'],resolve)
            },
            {
              path: 'ShareList',
              name: 'ShareList',
              component: resolve=>require(['@/components/operation/share_page/share_list'],resolve)
            },
            {
              path: '/ShareListAdd',
              name: 'ShareListAdd',
              component: resolve=>require(['@/components/operation/share_page/share_list_add'],resolve)
            },
            {
              path: 'ShareStatistical',
              name: 'ShareStatistical',
              component: resolve=>require(['@/components/operation/share_page/share_statistical'],resolve)
            },
            {
              path: '/ShareUser',
              name: 'ShareUser',
              component: resolve=>require(['@/components/operation/share_page/share_user'],resolve)
            },
            {
              path: '/AddArticleEdit/:id',
              name: 'AddArticleEdit',
              component: resolve=>require(['@/components/operation/share_page/add_article_edit'],resolve)
            },
            {
              path: '/AddArticle',
              name: 'AddArticle',
              component: resolve=>require(['@/components/operation/share_page/add_article'],resolve)
            },
            {
              path: '/AddRules',
              name: 'AddRules',
              component: resolve=>require(['@/components/operation/share_page/add.rules'],resolve)
            }
          ]
        },
        {
          path: '/SystemMain', // 系统设置 
          component: resolve=>require(['@/components/system/system_main'],resolve),
          children:[
            {
              path: '/',
              component: resolve=>require(['@/components/system/sys_base'],resolve)
            },
            {
              path: 'SysSms', // 系统短信配置
              component: resolve=>require(['@/components/system/sys_sms'],resolve)
            },
            {
              path: 'LiveList',// 系统直播配置
              component: resolve=>require(['@/components/system/live_list'],resolve)
            },
            {
              path: 'LiveList/LiveAdd',
              component: resolve=>require(['@/components/system/live_add'],resolve)
            },
            {
              path: 'LiveList/LiveEdit/:id',
              component: resolve=>require(['@/components/system/live_edit'],resolve)
            },
            {
              path: 'RoleList',
              component: resolve=>require(['@/components/menber/role_list'],resolve)
            },
            {
              path: 'RoleList/RoleAdd',
              component: resolve=>require(['@/components/menber/role_add'],resolve)
            },
            {
              path: 'RoleList/RoleEdit/:id',
              component: resolve=>require(['@/components/menber/role_edit'],resolve)
            },
          ]
        },
    
        {
          path: '/ClassMain',// 学生课表 
          component: resolve=>require(['@/components/students/ClassMain'],resolve),
          children: [
            {
              path: '/',
              component:resolve=>require(['@/components/students/StudentClass'],resolve)
            },
          ]
        },

        {
          path: '/StudentMoneyMain', // 学生账户明细
          component: resolve=>require(['@/components/students/StudentMoneyMain'],resolve),
          children:[
            {
              path:'VirtualMonney',
              component:resolve=>require(['@/components/students/VirtualMonney'],resolve)
            },
            {
              path:'NewMoney',
              component:resolve=>require(['@/components/students/NewMoney'],resolve)
            },
            {
              path:'LearningMoney',
              component:resolve=>require(['@/components/students/LearningMoney'],resolve)
            }
          ]
        },
      
      ]
    }  
  ]
})
