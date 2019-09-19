const PREFIX = '/api';
export default {
	manager: PREFIX + '/manager',
	managerItem: (id) => `${PREFIX}/manager/${id}`,
	user: PREFIX + '/user',
	userItem: (id) => `${PREFIX}/user/${id}`,
	payment: PREFIX + '/payment',
	paymentItem: (id) => `${PREFIX}/payment/${id}`,
	paymentAlone: `${PREFIX}/payment/alone/`,
	course: PREFIX + '/course',
	courseItem: (id) => `${PREFIX}/course/${id}`,
	courseAlone: PREFIX + '/course/alone/',
	class: PREFIX + '/class',
	classItem: (id) => `${PREFIX}/class/${id}`,
	classAdduser: id => `${PREFIX}/class/${id}/adduser`,
	lessonItem: id => `${PREFIX}/lesson/${id}`,
	lessonStatus: id => `${PREFIX}/lesson/${id}/status`,
  lessonCallNow: id => `${PREFIX}/lesson/${id}/callnow`,
  leave: PREFIX + '/leave',
	leaveItem: (id) => `${PREFIX}/leave/${id}`,

}