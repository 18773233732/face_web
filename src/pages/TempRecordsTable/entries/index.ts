export interface TempRecord {
  id: number;
  date: string;
  name: string;
  temp: number;
  state: number;
}

export interface GetAllTempRecordResult {
  success: boolean;
  code: number;
  data: {
    list: TempRecord[];
    success: boolean;
    total: number;
  };
  errorMessage: string;
}

export interface GetAllTempRecordParams {
  current: number;
  pageSize: number;
}
