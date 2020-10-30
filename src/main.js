// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import qs from "qs";
import axios from "axios";
import "./permission";
import mixin from '@/mixins/index';
import FastClick from "fastclick";
import layer from "vue-layer";
import "vue-layer/lib/vue-layer.css";
import Vant from "vant";
import "vant/lib/index.css";

import "lib-flexible/flexible.js"; //px-》rem自动转化

// 全局注册


FastClick.attach(document.body); // permission control

Vue.prototype.$axios = axios;
Vue.use(Vuex);
Vue.use(Vant);

Vue.mixin(mixin)

Vue.config.productionTip = false;
Vue.prototype.$layer = layer({
  msgtime: 3 //目前只有一项，即msg方法的默认消失时间，单位：秒
});
Vue.prototype.$qs = qs;
// 设置全局变量




Vue.prototype.$nameFormat = function (name) {
  if (name && name.length == 2) {
    return name.slice(0, 1) + "*";
  } else if (name && name.length > 2) {
    return name.slice(0, 1) + "*" + name.slice(-1);
  } else {
    return name;
  }
};
Vue.prototype.successCode = 200;
// window.addEventListener(
//   "popstate",
//   function (e) {
//     router.go(-1); // router已经在上面import进来
//   },
//   false
// );
/* eslint-disable no-new */
// 解决ios中input很难获取焦点
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
}
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
