/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
  currentUser?: API.CurrentUser | undefined;
}) {
  const { currentUser } = initialState || {};
  return {
    admin: currentUser && currentUser.type === 0,
    user: currentUser && currentUser.type === 1,
    doctor: currentUser && currentUser.type === 2,
  };
}
