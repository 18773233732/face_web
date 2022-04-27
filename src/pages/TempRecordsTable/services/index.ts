import request from '@/utils/request';
import type {
  GetAllTempRecordResult,
  GetAllTempRecordParams,
} from '../entries';

export function getAllTempRecordList(params: GetAllTempRecordParams) {
  return request<GetAllTempRecordResult>('/api/user/getAllTempRecords', {
    method: 'POST',
    data: params,
  });
}
