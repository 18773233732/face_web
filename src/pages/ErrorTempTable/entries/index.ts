export interface DayErrorParams {
  pageSize: number;
  current: number;
}

export interface DayErrorResult {
  success: boolean;
  code: number;
  data: {
    list: TempRecord[];
    success: boolean;
    total: number;
  };
  errorMessage: string;
}
export interface TempRecord {
  id: number;
  date: string;
  name: string;
  temp: number;
  state: number;
}
