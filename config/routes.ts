export default [
  {
    path: '/welcome',
    name: '首页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/user/logon',
    name: '用户注册',
    layout: false,
    icon: 'smile',
    // access: 'admin',
    component: './user/Logon',
  },
  {
    path: '/user',
    layout: false,
    icon: 'smile',
    routes: [
      {
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'smile',
  //   access: 'yyyy',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    path: '/account/center',
    component: './user/UserInfo',
  },
  {
    name: '用户列表',
    icon: 'smile',
    path: '/userlist',
    component: './UserList',
    // access: 'admin',
  },
  {
    name: '用户预约',
    icon: 'smile',
    path: '/order/doctorlist',
    // access: 'doctor',
    component: './DoctorOrder',
  },
  {
    name: '新建测试',
    icon: 'smile',
    path: '/addtest',
    component: './AddTest',
  },
  {
    name: '预约列表',
    icon: 'smile',
    path: '/order/userlist',
    component: './UserOrder',
  },
  {
    name: '新建测试2',
    icon: 'smile',
    path: '/addtest2',
    component: './AddTest2',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
