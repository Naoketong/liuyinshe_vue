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
    return request.get(API.course,params)
  },
  courseAlone(params) {
    return request.get(API.courseAlone, params)
  },
  update (id,params) {
    return request.put(API.courseItem(id),params)
  },
  add (params) {
    return request.post(API.course,params)
  },
  delete (id) {
    return request.delete(API.courseItem(id))
  },
  show: function(id) {
    return request.get(API.courseItem(id))
  }
}
