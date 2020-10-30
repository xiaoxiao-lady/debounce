import axios from "axios";
import store from "@/store";
import router from "@/router";
import * as $auth from "@/utils/auth";
import { Dialog } from "vant";
import layer from "vue-layer";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8";

axios.defaults.transformRequest = [
  function(data) {
    let ret = "";
    for (const it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  }
];
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API || BASEURL, // api的base_url
  timeout: 1000 * 120, // request timeout
  // withCredentials: true,         // 表示跨域请求时是否需要使用凭证
  headers: {
    // 'Content-Type': 'application/json; charset=utf-8'
  }
});

// request interceptor
service.interceptors.request.use(
  config => {
    const token = store.getters.token;
    if (token) {
      config.headers["token"] = token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    const canteenId = store.getters.canteenId;
    if (canteenId) {
      config.headers["canteenId"] = canteenId;
    }
    const companyId = store.getters.companyId;
    if (companyId) {
      config.headers["companyId"] = companyId;
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为 ，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if (!res.ok) {
      switch (res.code) {
        // 501: token失效或不存在
        case 999:
          layer().msg("TOKEN失效，请重新登录111！");
          // router.togo("/login");
          // MessageBox.alert('请重新登录', '您的账号已失效').then(action => {
          //   sessionStorage.removeItem('xxx-info')
          //   store.commit('setRedirect', router.currentRoute.fullPath)
          router.push(
            {
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            },
            () => {
              location.reload(); // 刷新页面, 清空整站临时存储数据
            }
          );
          break;
        // 其他错误，直接抛出错误提示
        case 500:
          layer().msg("请检查网络是否异常");
          break;
        default:
          layer().msg(res.message);
          break;
      }
      return Promise.reject(res.message);
    } else {
      return res;
    }
  },
  error => {
    this.$layer.msg(error);
    if (error.response) {
      switch (error.response.status) {
        case 999:
          // 返回 401 清除token信息并跳转到登录页面
          // store.dispatch('LogOut').then((response) => {
          //   this.$router.replace({
          //     path: 'login',
          //     query: {redirect: this.$router.currentRoute.fullPath}
          //   })
          //   // this.$router.push('/login');
          //   location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
          // $auth.removeToken();
          localStorage.removeItem("xxx-info");
          router.push(
            {
              name: "Login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            },
            () => {
              location.reload(); // 刷新页面, 清空整站临时存储数据
            }
          );
          break;
        case 404:
          // router.push('/404')
          break;
        case 500:
          router.push("/500");
          break;
        case 504:
          router.push("/500");
          break;
        default:
      }
    }

    return Promise.reject(error);
  }
);

export default service;
