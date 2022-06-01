// @ts-ignore
/* eslint-disable */

export interface CurrentUser {
  name: string;
  id: number;
  access: string;
}

export interface GetCurrentUserResult {
  success: boolean;
  code: number;
  data: CurrentUser;
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
    id: string;
    name: string;
  };
  errorMessage: string;
}
