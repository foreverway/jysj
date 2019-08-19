// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import VCharts from 'v-charts'
import App from './App'
import router from './router'
import store from './store'//引入store
// [ 可选组件 ] 图表

import apis from './api/apiList'
import 'babel-polyfill';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.$apis = apis
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false  // 设置为 false 以阻止 vue 在启动时生成生产提示。

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  store,//使用store  全局注入一下，这样一来就可以在任何一个组件里面使用this.$store了
  components: { App },
  template: '<App/>'
})
