import request from "@/global/request/axios";
import API from "@/global/request/api";

const classService = {
  create: function(params) {
    return request.post(API.class, params);
  },
  list: function() {
    return request.get(API.class);
  },
  delete: function(id) {
    return request.delete(API.classItem(id));
  },
  update: function(id, params) {
    return request.put(API.classItem(id), params);
  },
  show: function(id) {
    return request.get(API.classItem(id));
  }
};

export default classService;
