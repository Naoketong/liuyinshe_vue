import request from './request.js';
import API from './api.js';

export default {
   list(id, params) {
    return request.get(API.lessonItem(id), params);
  },
  status(id, params) {
    return request.post(API.lessonStatus(id), params);
  },
  callnow(id, params) {
    return request.post(API.lessonCallNow(id), params);
  }
}