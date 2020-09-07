import {request} from "./request.js";


export function getUserInfo() {

}

export function getOrderInfo() {
  return request({
    //请求路径
    method: 'get',
    url: '/api/order/getOrder',

  })
}

export function cancelOrder(orderNo) {
  return request({
    method: 'get',
    url: '/api/order/cancelOrder',
    params: {
      orderNo
    }
  })

}
