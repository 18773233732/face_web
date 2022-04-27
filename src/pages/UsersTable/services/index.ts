import request from '@/utils/request';
import type {
  GetAllUsersParams,
  GetAllUsersResult,
  UpdateUserInfoResult,
} from '../entries';

export function getUserList(params: GetAllUsersParams) {
  return request<GetAllUsersResult>('/api/user/getAllUsers', {
    method: 'POST',
    data: params,
  });
}

export function updateUserInfo(params: Pick<GetAllUsersParams, any>) {
  return request<UpdateUserInfoResult>('/api/user/updateUserInfo', {
    method: 'POST',
    data: params,
  });
}
