export default [
  {
    name: 'login',
    layout: false,
    hideInMenu: true,
    path: '/login',
    component: './user/Login',
  },
  {
    name: 'collect',
    layout: false,
    title: 'collect',
    hideInMenu: true,
    path: '/collectinfo',
    component: './CollectInfo',
  },
  {
    name: '系统管理',
    path: '/devops',
    icon: 'Api',
    access: 'admin',
    routes: [
      {
        path: '/devops/device/info',
        name: '信息管理',
        component: './DeviceInfoTable',
      },
      // {
      //   path: '/devops/user/users',
      //   name: '用户管理',
      //   component: './UsersTable',
      // },
    ],
  },
  {
    path: '/',
    redirect: '/collectinfo',
  },
  {
    component: './404',
  },
];
