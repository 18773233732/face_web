export default [
  {
    path: '/',
    redirect: '/dashboard/analyis',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'DashboardOutlined',
    routes: [
      {
        path: '/analysis',
        component: '@/pages/index',
        name: '分析页',
      },
      {
        path: '/monitor',
        component: '@/pages/index',
        name: '监控页',
      },
      {
        path: '/workplace',
        component: '@/pages/index',
        name: '工作台',
      },
    ],
  },
  {
    path: '/yao1',
    component: '@/pages/index',
    name: 'yao',
  },
  {
    path: '/yao2',
    component: '@/pages/index',
    name: 'yao',
    routes: [
      {
        path: '/yao2/yao21',
        component: '@/pages/index',
        name: 'yao',
      },
      {
        path: '/yao2/yao22',
        component: '@/pages/index',
        name: 'yao',
      },
    ],
  },
  {
    path: '/yao3',
    component: '@/pages/index',
    name: 'yao',
  },
];
