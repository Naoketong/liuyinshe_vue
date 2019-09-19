import request from './request.js';
import API from './api.js';

export default {
  login (params) {
    return request.post(API.login, params)
  },
  logout () {
    localStorage.clear()
  },
  list (params) {
    return request.get(API.payment, params)
  },
  paymentAlone(params) {
    return request.get(API.paymentAlone, params)
  },
  seek (name,params) {
    return request.get(API.paymentItems(name), params)
  },
  update (id,params) {
    return request.put(API.paymentItem(id),params)
  },
  add (params) {
    return request.post(API.payment,params)
  },
  delete (id) {
    return request.delete(API.paymentItem(id))
  }
}