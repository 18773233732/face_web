export interface RegisterParams {
  name: string;
  phone: string;
  provinces: string;
  city: string;
  area: string;
  picBase64: string;
  role: number;
  password: string;
  college: string;
}

export interface RegisterResult {
  success: boolean;
  code: number;
  data: object;
  errorMessage: string;
}
