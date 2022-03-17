import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  routes,
  layout: {
    navTheme: 'dark',
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
