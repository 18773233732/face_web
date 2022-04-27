export default [
  {
    name: 'login',
    layout: false,
    hideInMenu: true,
    path: '/user/login',
    component: './user/Login',
  },
  {
    name: '添加账户',
    icon: 'crown',
    path: '/user/register',
    component: './user/register',
    access: 'admin',
  },
  {
    path: '/account/settings',
    hideInMenu: true,
    component: './user/update',
  },
  {
    path: '/users',
    name: '所有用户',
    icon: 'crown',
    component: './UsersTable',
    access: 'admin',
  },
  {
    path: '/devices',
    name: '设备信息',
    icon: 'crown',
    component: './DeviceInfoTable',
    access: 'admin',
  },
  {
    path: '/records',
    icon: 'crown',
    name: '用户打卡信息',
    component: './TempRecordsTable',
    access: 'admin',
  },
  {
    path: '/dashboard/device',
    name: '测温设备面板',
    icon: 'smile',
    component: './Dashboard/DeviceBoard',
    access: 'admin',
  },
  {
    path: '/dashboard/school',
    name: '校园监控面板',
    icon: 'smile',
    component: './Dashboard/SchoolBoard',
  },
  {
    path: '/',
    redirect: '/dashboard/school',
  },
  {
    component: './404',
  },
];
