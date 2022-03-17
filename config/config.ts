import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/dashboard', routes: [{}] },
    {
      path: '/yao1',
      component: '@/pages/index',
      name: 'yao',
      icon: 'DashboardOutlined',
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
  ],
  fastRefresh: {},
  layout: {
    navTheme: 'light',
    primaryColor: '#F5222D',
    layout: 'mix',
    contentWidth: 'Fluid',
    siderWidth: 208,
    fixedHeader: false,
    fixSiderbar: true,
    pwa: false,
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    headerHeight: 48,
    splitMenus: false,
  },
});
