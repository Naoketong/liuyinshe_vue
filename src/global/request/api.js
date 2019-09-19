// const PREFIX = 'http://localhost:3000/api';
const PREFIX = "/api";

const API = {
  authLogin: `${PREFIX}/auth/login`,
  manager: `${PREFIX}/manager`,
  managerItem: id => `${PREFIX}/manager/${id}`,
  user: `${PREFIX}/user`,
  userItem: id => `${PREFIX}/user/${id}`,
  payment: `${PREFIX}/payment`,
  course: `${PREFIX}/course`,
  courseItem: id => `${PREFIX}/course/${id}`,
  class: `${PREFIX}/class`,
  classItem: id => `${PREFIX}/class/${id}`,
  lessonItem: id => `${PREFIX}/lesson/${id}`
};

export default API;
