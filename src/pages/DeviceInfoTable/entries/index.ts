export interface DeviceInfo {
  cpu: string;
  date: string;
  disk: number;
  id: number;
  ip: string;
  mem: number;
  name: string;
}

export interface GetAllDeviceInfoResult {
  success: boolean;
  code: number;
  data: {
    list: DeviceInfo[];
    success: boolean;
    total: number;
  };
  errorMessage: string;
}

export interface GetAllDeviceInfoParams {
  current: number;
  pageSize: number;
}
