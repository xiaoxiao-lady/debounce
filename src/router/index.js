import Vue from "vue";
import Router from "vue-router";
const originalPush = Router.prototype.push;
Router.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);


export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
      meta: {
        title: ""
      }
    },
    {
      path: "/login",
      component: resolve => require(["@/pages/login/index"], resolve),
      meta: {
        title: ""
      }
    },
    {
      path: "/home",
      name: "Home",
      component: resolve => require(["@/pages/home/index"], resolve),
      meta: { title: "首页" }
    },

  ]
});
