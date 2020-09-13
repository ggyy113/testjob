import {request} from "./request.js";

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

export function payOrder(orderNo) {

  return request({
    method: 'get',
    url: '/api/order/pay',
    params: {
      orderNo
    }
  })
}