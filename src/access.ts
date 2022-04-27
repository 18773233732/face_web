import type { CurrentUser } from './entries';
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
  currentUser?: CurrentUser | undefined;
}) {
  const { currentUser } = initialState || {};
  return {
    //
    admin: currentUser && currentUser.role === 2,
  };
}
