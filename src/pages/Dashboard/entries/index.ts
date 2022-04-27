export interface GetUserInfoParams {
  name: string;
}

export interface DeviceInfo {
  cpu: number;
  date: string;
  disk: number;
  ip: string;
  mem: number;
  name: string;
}

export interface GetUserInfoResult {
  code: number;
  data: {
    deviceInfo: DeviceInfo;
  };
  errorMessage: string;
  success: boolean;
}

export interface GetUserLengthResult {
  code: number;
  data: {
    length: number;
  };
  errorMessage: string;
  success: boolean;
}

export interface GetErrorDataResult {
  code: number;
  data: {
    yesterdayError: number;
    todayError: number;
    todayRecoreds: number;
  };
  errorMessage: string;
  success: boolean;
}
