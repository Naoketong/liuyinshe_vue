import request from "@/global/request/axios";
import API from "@/global/request/api";

const userService = {
  create: function(params) {
    return request.post(API.user, params);
  },
  list: function() {
    return request.get(API.user);
  },
  delete: function(id) {
    return request.delete(API.userItem(id));
  },
  update: function(id, params) {
    return request.put(API.userItem(id), params);
  },
  show: function(id) {
    return request.get(API.userItem(id));
  }
};

export default userService;
