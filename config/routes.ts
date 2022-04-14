export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '控制面板',
    icon: 'crown',
    routes: [
      {
        path: '/dashboard/system',
        name: '系统面板',
        icon: 'smile',
        component: './Dashboard/SystemBoard',
      },
      {
        path: '/dashboard/school',
        name: '校园面板',
        icon: 'smile',
        component: './Dashboard/SchoolBoard',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Dashboard/SystemBoard',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: '新建测试',
    icon: 'table',
    path: '/addtest',
    component: './AddTest',
  },
  {
    name: '新建测试2',
    icon: 'table',
    path: '/addtest2',
    component: './AddTest2',
  },
  {
    path: '/',
    redirect: '/dashboard/system',
  },
  {
    component: './404',
  },
];
