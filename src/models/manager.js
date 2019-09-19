import request from './request.js';
import API from './api.js';

export default {
  login (params) {
    return request.post(API.login, params)
  },
  logout () {
    localStorage.clear()
  },
  list () {
    return request.get(API.manager)
  },

  
  update (id,params) {
    return request.put(API.managerItem(id),params)
  },
  add (params) {
    return request.post(API.manager,params)
  },
  delete (id) {
    return request.delete(API.managerItem(id))
  },
  show: function(id) {
    return request.get(API.managerItem(id));
  }
}