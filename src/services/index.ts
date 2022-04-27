// @ts-ignore
/* eslint-disable */
import { GetCurrentUserResult, LoginParams, LoginResult } from '@/entries';
import request from '@/utils/request';
// import { omit } from 'lodash';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return request<GetCurrentUserResult>('/api/user/getUserInfo', {
    method: 'GET',
  });
}

// export async function getTestData(options?: { [key: string]: any }) {
//   return request<{
//     data: any;
//   }>('/api/getTestData', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

// export async function getDeviceInfo(options?: { [key: string]: any }) {
//   return request<{
//     data: any;
//   }>('/api/getMyDeviceInfo', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(params?: Record<string, any>) {
  return request<LoginParams>('/api/user/logout', {
    method: 'POST',
    data: params,
  });
}

// /** 图片上传接口 POST /api/upload_pic */
// export async function uploadPic(body: any, options?: { [key: string]: any }) {
//   return request<any>('/api/upload_pic', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }

/** 登录接口 POST /api/login/account */
export async function login(params: Record<string, any>) {
  return request<LoginResult>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

// /** 此处后端没有提供注释 GET /api/notices */
// export async function getNotices(options?: { [key: string]: any }) {
//   return request<API.NoticeIconList>('/api/notices', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

// /** 获取规则列表 GET /api/rule */
// export async function rule(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.RuleList>('/api/rule', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// /** 新建规则 PUT /api/rule */
// export async function updateRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/api/rule', {
//     method: 'PUT',
//     ...(options || {}),
//   });
// }

// /** 新建规则 POST /api/rule */
// export async function addRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/api/rule', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }

// /** 删除规则 DELETE /api/rule */
// export async function removeRule(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/api/rule', {
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
