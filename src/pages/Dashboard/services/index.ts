import request from '@/utils/request';
import type {
  GetUserInfoResult,
  GetUserLengthResult,
  GetErrorDataResult,
} from '../entries';

export async function getDeviceInfo(options?: Record<string, any>) {
  return request<GetUserInfoResult>('/api/device/getDeviceInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getUsersLength(options?: Record<string, any>) {
  return request<GetUserLengthResult>('/api/user/getUsersLength', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getErrorData(options?: Record<string, any>) {
  return request<GetErrorDataResult>('/api/user/getErrorData', {
    method: 'GET',
    ...(options || {}),
  });
}
