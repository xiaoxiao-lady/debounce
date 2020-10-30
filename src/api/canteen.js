import request from "@/apiconfig/index";

/**
 * [getCanteenList 获取餐厅列表]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function getCanteenList(data) {
  return request({
    url: "/front/canteen/list",
    method: "post",
    params: data
  });
}
/**
 * [getCanteenList 获取餐厅列表]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function listForDinner(data) {
  return request({
    url: "/front/canteen/listForDinner",
    method: "post",
    params: data
  });
}
// 详情
export function canteenInfo(data) {
  return request({
    url: "/front/canteen/info",
    method: "post",
    params: data
  });
}
