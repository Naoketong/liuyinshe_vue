import request from './request.js';
import API from './api.js';

export default {
  list (params) {
    return request.get(API.leave,params)
  },
  show (id) {
    return request.get(API.leaveItem(id));
  },
  update (id,params) {
    return request.put(API.leaveItem(id),params)
  },
  add (params) {
    return request.post(API.leave,params)
  },
  delete (id) {
    return request.delete(API.leaveItem(id))
  }
}