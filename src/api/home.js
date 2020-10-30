/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
// import {fetch, baseUrl} from 'config/index'
import request from "@/apiconfig/index";
// // 登录接口
// export function loginUserNo (params) {
//   return fetch(`${baseUrl}/company/user/login`, params)
// }
// /front/member/employee/login
// 统计
export function getTakerIndex(data) {
  return request({
    url: "/front/taker/statisticOrder",
    method: "post",
    params: data,

  });
}
// 统计
export function getOrderSettle(data) {
  return request({
    url: "/front/taker/statisticOrderSettle",
    method: "post",
    params: data
  });
}
// 获取病患的列表
export function getMemberList(data) {
  return request({
    url: "/front/taker/getBedList",
    method: "post",
    params: data
  });
}
// 获取公告的列表
export function getInformationList(data) {
  return request({
    url: "/front/canteen/getInformationList",
    method: "post",
    params: data
  });
}
// 获取公告的详情
export function getInformation(data) {
  return request({
    url: "/front/canteen/getInformation",
    method: "post",
    params: data
  });
}

// 获取院区
export function companyListByQo(data) {
  return request({
    url: "/front/company/listByQo",
    method: "post",
    params: data
  });
}
