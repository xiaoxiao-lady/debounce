import request from "@/apiconfig/index";

// 用户名登录
export function loginByUsername(data) {
  return request({
    // url: '/front/member/employee/login',
    url: "/front/member/login",
    method: "post",
    params: data
  });
}
// 用户名登录
export function getMember(data) {
  return request({
    // url: '/front/member/employee/login',
    url: "/front/member/getMember",
    method: "post",
    params: data
  });
}
// 用户名登录
export function getFunctionConfig(data) {
  return request({
    url: "/front/canteen/getFunctionConfig",
    method: "post",
    params: data
  });
}

