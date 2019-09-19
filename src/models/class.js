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
    return request.get(API.class,params)
  },
  classAdduser(id,params) {
    return request.post(API.classAdduser(id), params)
  },
  updateLesson: function(id, params) {
    return request.put(API.lessonItem(id), params);
  },
  update (id,params) {
    return request.put(API.classItem(id), params)
  },
  add (params) {
    return request.post(API.class,params)
  },
  delete (id) {
    return request.delete(API.classItem(id))
  },
  show: function(id) {
    return request.get(API.classItem(id))
  }
}
