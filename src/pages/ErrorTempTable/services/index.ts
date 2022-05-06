import request from '@/utils/request';
import type { DayErrorParams, DayErrorResult } from '../entries';

export function getYesterdayTempRecordList(params: DayErrorParams) {
  return request<DayErrorResult>('/api/user/getYesterdayTempRecords', {
    method: 'POST',
    data: params,
  });
}

export function getTodayTempRecordList(params: DayErrorParams) {
  return request<DayErrorResult>('/api/user/getTodayTempRecords', {
    method: 'POST',
    data: params,
  });
}
