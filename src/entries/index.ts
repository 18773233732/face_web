// @ts-ignore
/* eslint-disable */

export interface CurrentUser {
  name: string;
  id: number;
  date: string;
  provinces: string;
  city: string;
  area: string;
  pic: string;
  phone: string;
  state: number;
  role: number;
}

export interface GetCurrentUserResult {
  success: boolean;
  code: number;
  data: {
    userInfo: CurrentUser;
  };
  errorMessage: string;
}

export interface LoginParams {
  name: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  code: number;
  data: {
    token: string;
    userInfo: CurrentUser;
  };
  errorMessage: string;
}
