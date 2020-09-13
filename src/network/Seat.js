import {request} from "./request.js";

export function getSeatByShowMessage(showMessage) {
  return request({

    method: 'get',
    url: '/api/seat/getSeatDetail',
    params: {
      showMessage
    }
  })
}