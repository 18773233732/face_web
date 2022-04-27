import request from '@/utils/request';
import type {
  GetAllDeviceInfoResult,
  GetAllDeviceInfoParams,
} from '../entries';

export function getDeviceInfoList(params: GetAllDeviceInfoParams) {
  return request<GetAllDeviceInfoResult>('/api/device/getAllDeviceInfo', {
    method: 'POST',
    data: params,
  });
}
