import request from "@/apiconfig/index";

// 获取订单列表
export function getOrderList(data) {
  return request({
    url: "/front/order/pageQuery",
    method: "post",
    params: data
  });
}

/**
 * [createOrder 创建订单]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function createOrder(data) {
  return request({
    url: "/front/cart/createOrder",
    method: "post",
    params: data
  });
}

/**
 * [payOrder 去支付]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function payOrder(data) {
  return request({
    url: "/front/pay/prepay",
    method: "post",
    data: data
  });
}

/**
 * [getOrderDetail 获取单个详情]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function getOrderDetail(data) {
  return request({
    url: "/front/order/detail",
    method: "post",
    data: data
  });
}

/**
 * [cancelOrder 取消订单]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function cancelOrder(data) {
  return request({
    url: "/front/order/cancel",
    method: "post",
    data: data
  });
}

/**
 * [refundOrder 退款]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function refundOrder(data) {
  return request({
    url: "/front/order/refund",
    method: "post",
    data: data
  });
}

// /front/order/getPatientToday
/**
 * [getPatientTodayOrder 订单管理】获取病患今日所点餐别]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function getPatientTodayOrder(data) {
  return request({
    url: "/front/taker/getPatientInfo",
    method: "post",
    data: data
  });
}

//完善病患信息
export function perfectPatientInfo(data) {
  return request({
    url: "/front/taker/perfectPatientInfo",
    method: "post",
    data: data
  });
}
//订单确认收货
export function orderSendConfirm(data) {
  return request({
    url: "/front/order/confirm",
    method: "post",
    data: data
  });
}
//订单确认送达
export function orderSended(data) {
  return request({
    url: "/front/order/sended",
    method: "post",
    data: data
  });
}
//订单评价
export function orderComment(data) {
  return request({
    url: "/front/order/comment",
    method: "post",
    data: data
  });
}

//获取卡片更新信息
export function getCardInfo(params) {
  return request({
    url: "/front/taker/getCardInfoByCardId",
    method: "post",
    params
  });
}
//订单详情(根据核销码获取)
export function detailByCode(params) {
  return request({
    url: "/front/order/detailByCode",
    method: "post",
    params
  });
}
//订单详情(根据核销码获取)
export function getSendOrderDetail(params) {
  return request({
    url: "/front/taker/getSendOrderDetail",
    method: "post",
    params
  });
}

