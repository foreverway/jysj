// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import VCharts from 'v-charts'
import App from './App'
import CMenu from './templates/menu.vue'

// [ 可选组件 ] 图表

import apis from './api/apiList'
import 'babel-polyfill';
import ElementUI from 'element-ui';
import '../theme/index.css'

// import 'element-ui/lib/theme-chalk/index.css';

//把组件放在第三方样式之后，在main.js中引入顺序决定了打包后css的顺序
import router from './router'
import store from './store'//引入store
Vue.prototype.$apis = apis
Vue.component('c-menu', CMenu);
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false  // 设置为 false 以阻止 vue 在启动时生成生产提示。

/* eslint-disable no-new */
new Vue({ //注册成为Vue对象的方法 实例化vue对象
  //在面向对象的编程中，通常把用类创建对象的过程称为实例化  
  //实例化一个对象 就是为对象开辟内存空间，或者是不用声明，直接使用new 构造函数名（），建立一个临时对象。
  el: '#app',
  router,
  $,
  store,//使用store  全局注入，这样一来就可以在任何一个组件里面使用this.$store了
  components: { App },
  template: '<App/>'
})

//每个vue实例在被创建之前都要经过一系列的初始化过程，这个过程就是vue的生命周期。
//详细来说，就是Vue实例从开始创建，初始化数据，编译模板，挂在dom->渲染，更新->渲染，卸载等一系列过程，
//我们称这是vue的生命周期，各个阶段有相对应的事件钩子。
