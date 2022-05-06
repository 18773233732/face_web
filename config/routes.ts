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
    name: '系统运维',
    path: '/devops',
    icon: 'Api',
    access: 'admin',
    routes: [
      {
        path: '/devops/device/info',
        name: '温测设备信息',
        component: './DeviceInfoTable',
      },
      {
        path: '/devops/deviced/ashboard',
        name: '测温设备面板',
        component: './Dashboard/DeviceBoard',
      },
      {
        path: '/devops/user/users',
        name: '系统所有用户',
        component: './UsersTable',
      },
      {
        name: '系统添加账户',
        path: '/devops/user/register',
        component: './user/register',
      },
    ],
  },
  {
    name: '疫情信息',
    path: '/situation',
    icon: 'Dashboard',
    routes: [
      {
        path: '/situation/dashboard/school',
        name: '校园监控面板',
        icon: 'smile',
        component: './Dashboard/SchoolBoard',
      },
      {
        path: '/situation/records',
        name: '用户打卡信息',
        component: './TempRecordsTable',
      },
      {
        path: '/situation/yesterdayrecords',
        component: './ErrorTempTable/Yesterday',
      },
      {
        path: '/situation/todayrecords',
        component: './ErrorTempTable/Today',
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
