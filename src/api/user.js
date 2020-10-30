import request from '@/apiconfig/index'
import axios from "axios"

/**
 * [getMemberPageQuery 【用户相关】分页获取列表(职工、点餐员、病患)]
 * @param  {[type]} data [description]
 * {
 *  type 用户类型：1职工，2点餐员，3病患
 *  areaId: 病区ID：
 * }
 * @return {[type]}      [description]
 */
export function getMemberPageQuery(data) {
  return request({
    url: '/front/member/pageQuery',
    method: 'post',
    params: data
  })
}

// 通过病区获取病床（病患信息）
export function bedQueryByAreaId(data) {
  return request({
    url: '/front/address/taker/bed/queryByAreaId',
    method: 'post',
    params: data
  })
}


//获取验证码
export function sendCode(data) {
  return request({
    url: '/front/member/sendCode',
    method: 'post',
    params: data
  })
}
//忘记密码
export function forgetPassword(data) {
  return request({
    url: '/front/member/passwordForget',
    method: 'post',
    params: data
  })
}
//修改密码
export function updatePassword(data) {
  return request({
    url: '/front/member/passwordUpdate',
    method: 'post',
    params: data
  })
}
//修改手机号
export function updateMobile(data) {
  return request({
    url: '/front/member/updateMobile',
    method: 'post',
    params: data
  })
}
//登录用户信息
export function getMemberInfo(data) {
  return request({
    url: '/front/member/getMemberInfo',
    method: 'post',
    params: data
  })
}

//登出
export function loginOut(data) {
  return request({
    url: '/front/member/logout',
    method: 'post',
    params: data
  })
}
//更换头像
export function updateMemberLogo(data) {
  return request({
    url: '/front/member/updateMemberLogo',
    method: 'post',
    params: data
  })
}
//上传图片
export function single(data) {
  return request({
    url: '/common/oss/single',
    method: 'post',
    data: data,
    transformRequest: [
      function (data) {
        return data;
      },
    ],
    // headers: { 'Content-Type': 'multipart/form-data' }
  })
}
