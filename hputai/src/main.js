// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import VCharts from 'v-charts'
import App from './App'
import 'babel-polyfill' //引入转化es6到es5的语法  支持ie
// [ 可选组件 ] 图表

import apis from './api/apiList'
import ElementUI from 'element-ui';
import '../theme/index.css'

//引入公共头部
import zxhead from './templates/Head';
//全局注册组件
Vue.component('zx-head', zxhead);
// import 'element-ui/lib/theme-chalk/index.css';

//把组件放在第三方样式之后，在main.js中引入顺序决定了打包后css的顺序
import router from './router'
import store from './store'//引入store
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.prototype.$apis = apis
// Vue.prototype.$echarts = echarts;  全局使用echarts
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false  // 设置为 false 以阻止 vue 在启动时生成生产提示。

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  store,//使用store  全局注入，这样一来就可以在任何一个组件里面使用this.$store了
  components: { App },
  template: '<App/>'
})
//注册成为Vue对象的方法 
