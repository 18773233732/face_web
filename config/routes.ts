﻿export default [
  {
    path: '/welcome',
    name: '首页',
    icon: 'Home',
    component: './Welcome',
  },
  {
    name: '医学文章',
    icon: 'Copy',
    path: './article',
    component: './ArticleList',
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
    icon: 'UsergroupAdd',
    path: '/userlist',
    routes: [
      {
        name: '所有患者',
        path: '/userlist/users',
        component: './UserList/Users',
        access: 'admin',
      },
      {
        name: '所有医生',
        path: '/userlist/doctors',
        component: './UserList/Doctors',
        access: 'admin',
      },
    ],
  },
  {
    name: '用户预约',
    icon: 'ClockCircle',
    path: '/order/doctorlist',
    access: 'user',
    component: './DoctorOrder',
  },
  {
    name: '用户咨询',
    icon: 'QuestionCircle',
    path: '/ask/askdoctorlist',
    access: 'user',
    component: './AskDocTorList',
  },
  {
    name: '医生咨询',
    icon: 'QuestionCircle',
    path: '/ask/askuserlist',
    access: 'doctor',
    component: './AskUserList',
  },
  {
    name: '医生诊疗',
    icon: 'Form',
    path: '/treament/userList',
    access: 'doctor',
    component: './TreatMentUser',
  },
  {
    name: '我的诊疗',
    icon: 'Form',
    path: 'treament/doctorList',
    access: 'user',
    component: './TreatMentDoctor',
  },
  {
    name: '医生预约',
    icon: 'ClockCircle',
    path: '/order/userlist',
    access: 'doctor',
    component: './UserOrder',
  },
  {
    name: '所有诊疗',
    icon: 'Form',
    path: '/treament/admin',
    access: 'admin',
    component: './TreatMentAdmin',
  },
  {
    name: '所有预约',
    icon: 'ClockCircle',
    path: '/order/admin',
    access: 'admin',
    component: './OrderAdmin',
  },
  {
    name: '所有咨询',
    icon: 'QuestionCircle',
    path: '/ask/admin',
    access: 'admin',
    component: './AskAdmin',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/about',
    name: '关于',
    icon: 'RadiusSetting',
    component: './About',
  },
  {
    component: './404',
  },
];
