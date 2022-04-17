export default [
  {
    path: '/welcome',
    name: '首页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/user/logon',
    layout: false,
    component: './user/Logon',
  },
  {
    path: '/user',
    layout: false,
    icon: 'smile',
    routes: [
      {
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account/center',
    component: './user/UserInfo',
  },
  {
    name: '用户列表',
    icon: 'smile',
    path: '/userlist',
    component: './UserList',
    access: 'admin',
  },
  {
    name: '我的预约',
    icon: 'smile',
    path: '/order/doctorlist',
    access: 'user',
    component: './DoctorOrder',
  },
  {
    name: '我的咨询',
    icon: 'smile',
    path: '/ask/askdoctorlist',
    access: 'user',
    component: './AskDocTorList',
  },
  {
    name: '我的咨询',
    icon: 'smile',
    path: '/ask/askuserlist',
    access: 'doctor',
    component: './AskUserList',
  },
  {
    name: '我的诊疗',
    icon: 'smile',
    path: '/treament/userList',
    access: 'doctor',
    component: './TreatMentUser',
  },
  {
    name: '我的诊疗',
    icon: 'smile',
    path: 'treament/doctorList',
    access: 'user',
    component: './TreatMentDoctor',
  },
  {
    name: '医学文章',
    icon: 'smile',
    path: './article',
    component: './ArticleList',
  },
  {
    name: '我的预约',
    icon: 'smile',
    path: '/order/userlist',
    access: 'doctor',
    component: './UserOrder',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
