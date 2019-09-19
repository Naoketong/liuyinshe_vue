import Layout from '@/components/Layout'

const Login = () =>
  import(/* webpackChunkName: "account" */ "@/views/login.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard.vue");
const Home = () =>
  import("@/views/home.vue");
const Error404 = () =>
  import( "@/views/Error404.vue");
const Manager = () =>
  import("@/views/manager/manager.vue");
const ManagerEdit = () =>
  import("@/views/manager/manager_edit.vue");
const ManagerCreate = () =>
  import("@/views/manager/manager_create.vue");

const User = () =>
  import("@/views/user/user.vue");
const UserEdit = () =>
  import("@/views/user/user_edit.vue");
const UserCreate = () =>
  import("@/views/user/user_create.vue");
const UserItem = () =>
  import("@/views/user/user_item.vue");


const Payment = () =>
  import("@/views/payment/payment.vue");
const PaymentCreate = () =>
  import("@/views/payment/payment_create.vue");
const PaymentSeek = () =>
  import("@/views/payment/payment_seek.vue");

const Course = () =>
  import("@/views/course/course.vue");
const CourseEdit = () =>
  import("@/views/course/course_edit.vue");
const CourseCreate = () =>
  import("@/views/course/course_create.vue");

const Class = () =>
  import("@/views/class/class.vue");
const ClassEdit = () =>
  import("@/views/class/class_edit.vue");
const ClassCreate = () =>
  import("@/views/class/class_create.vue");
const ClassItem = () =>
  import("@/views/class/class_item.vue");

const Lesson = () =>
  import("@/views/lesson/lesson.vue");
const Leave = () =>
  import("@/views/leave/leave.vue");

export default [
 {
    path: "/",
    component: Home,
    name: "Home"
  },
  {
    path: "/login",
    component: Login,
    name: "Login"
  },

  {
    path: "/admin",
    name: "Admin",
    component: Layout,
    children:[
      {
        path: "/admin",
        name: "Dashboard",
        component: Dashboard,
        meta:{
         breadcrumb:{
          title: "概览",
          replace: false
         },
         nav: {
          icon: "el-icon-pie-chart",
          title: "概况"
         } 
        },
      }, 
      {
        path: "admin/user",
        name: "UserRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "User" },
        meta:{
          nav: {
            icon: 'el-icon-picture-outline-round',
            title: '学员'
          },
          breadcrumb: {
            title: '学员',
          },
        },
        children: [
          {
            path: "/admin/user",
            name: "User",
            component: User
          },
          {
            path: "/admin/user/create",
            name: "UserCreate",
            component: UserCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          {
            path: "/admin/user/:id",
            name: "UserItem",
            component: UserItem,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
          {
            path: "/admin/user/:id/edit",
            name: "UserEdit",
            component: UserEdit,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
        ],
      },
      {
        path: "admin/leave",
        name: "Leave",
        component: Leave,
        meta: {
          breadcrumb: {
            title: "请假管理",
            replace: false
          },
          nav: {
            icon: "el-icon-headset",
            title: "请假"
          }
        }
      },
      {
        path: "admin/payment",
        name: "PaymentRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Payment" },
        meta:{
          nav: {
            icon: 'el-icon-ice-cream-round',
            title: '收支'
          },
          breadcrumb: {
            title: '收支',
          },
        },
        children: [
          {
            path: "/admin/payment",
            name: "Payment",
            component: Payment
          },
          {
            path: "/admin/payment/seek",
            name: "PaymentSeek",
            component: PaymentSeek
          },
          {
            path: "/admin/payment/create",
            name: "PaymentCreate",
            component: PaymentCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          
        ],
      },
      {
        path: "admin/course",
        name: "CourseRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Course" },
        meta:{
          nav: {
            icon: 'el-icon-video-camera-solid',
            title: '课程'
          },
          breadcrumb: {
            title: '课程',
          },
        },
        children: [
          {
            path: "/admin/course",
            name: "Course",
            component: Course
          },
          {
            path: "/admin/course/create",
            name: "CourseCreate",
            component: CourseCreate,
            meta: {
              breadcrumb: {
                title: "新建课程"
              }
            }
          },
          {
            path: "/admin/course/:id/edit",
            name: "CourseEdit",
            component: CourseEdit,
            meta: {
              breadcrumb: {
                title: "修改课程"
              }
            }
          },
        ],
      },
      {
        path: "admin/class",
        name: "ClassRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Class" },
        meta:{
          nav: {
            icon: 'el-icon-toilet-paper',
            title: '班级'
          },
          breadcrumb: {
            title: '班级',
          },
        },
        children: [
          {
            path: "/admin/class",
            name: "Class",
            component: Class
          },
          {
            path: "/admin/class/create",
            name: "ClassCreate",
            component: ClassCreate,
            meta: {
              breadcrumb: {
                title: "新建班级"
              }
            }
          },
          {
            path: "/admin/class/:id",
            name: "ClassItem",
            component: ClassItem,
            meta: {
              breadcrumb: {
                title: "班级详情"
              }
            }
          },
          {
            path: "/admin/class/:id/edit",
            name: "ClassEdit",
            component: ClassEdit,
            meta: {
              breadcrumb: {
                title: "修改班级"
              }
            }
          },
          {
            path: "/admin/lesson/:id",
            name: "Lesson",
            component: Lesson,
            meta: {
              breadcrumb: {
                title: "点名"
              }
            }
          },
        ],
      },




      {
        path: "/admin/manager",
        name: "ManagerRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Manager" },
        meta:{
          nav: {
            icon: "el-icon-user",
            title: "管理员"
          },
          breadcrumb: {
            title: "管理员"
          }
        },
        children: [
          {
            path: "/admin/manager",
            name: "Manager",
            component: Manager
          },
          {
            path: "/admin/manager/create",
            name: "ManagerCreate",
            component: ManagerCreate,
            meta: {
              breadcrumb: {
                title: "新建"
              }
            }
          },
          {
            path: "/admin/manager/:id/edit",
            name: "ManagerEdit",
            component: ManagerEdit,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
        ],
      },

        
      
    ],
  }, 
  {
    path: "/*",
    name: 'Error404',
    component: Error404
  }
];

