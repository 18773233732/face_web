export default [
  {
    name: 'login',
    layout: false,
    hideInMenu: true,
    path: '/user/login',
    component: './user/Login',
  },
  {
    path: '/account/settings',
    hideInMenu: true,
    component: './user/update',
  },
  {
    name: '系统管理',
    path: '/devops',
    icon: 'Api',
    access: 'admin',
    routes: [
      {
        path: '/devops/device/info',
        name: '游戏管理',
        component: './DeviceInfoTable',
      },
      {
        path: '/devops/user/users',
        name: '用户管理',
        component: './UsersTable',
      },
    ],
  },
  {
    name: '订单管理',
    path: '/situation',
    icon: 'Dashboard',
    routes: [
      {
        path: '/situation/records',
        name: '订单信息',
        component: './TempRecordsTable',
      },
    ],
  },
  {
    path: '/',
    redirect: '/situation/dashboard/school',
  },
  {
    component: './404',
  },
];
