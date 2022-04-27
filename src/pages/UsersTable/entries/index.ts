import type { CurrentUser } from '@/entries';

export interface GetAllUsersResult {
  success: boolean;
  code: number;
  data: {
    list: CurrentUser[];
    success: boolean;
    total: number;
  };
  errorMessage: string;
}

export interface GetAllUsersParams {
  current: number;
  pageSize: number;
}

export interface UpdateUserInfoResult {
  code: number;
  data: object;
  errorMessage: string;
  success: boolean;
}
