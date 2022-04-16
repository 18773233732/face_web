// @ts-ignore
/* eslint-disable */
// import request from '@/utils/request';
import { request } from 'umi';
// import { omit } from 'lodash';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.GetUserInfo>('/api/user/selectList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: options,
    ...(options || {}),
  });
}

export async function getTestData(options?: { [key: string]: any }) {
  return request<{
    data: any;
  }>('/api/getTestData', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

/** 图片上传接口 POST /api/upload_pic */
export async function uploadPic(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/upload_pic', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/logon */
export async function logon(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/user/logon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/logon */
export async function userDelete(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户 POST /api/user/update */
export async function userUpdate(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 医生查询自己预约列表 POST /api/order/selectUserList */
export async function getDoctorOrderList(
  body: any,
  options?: { [key: string]: any },
) {
  return request<any>('/api/order/selectUserList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 自己查询自己的预约 POST /api/order/selectDoctorOrder */
export async function getUserOrderList(
  body: any,
  options?: { [key: string]: any },
) {
  return request<any>('/api/order/selectDoctorOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function selectUserList(options?: { [key: string]: any }) {
  return request<any>('/api/user/selectList', {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
