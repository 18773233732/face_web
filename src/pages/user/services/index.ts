import request from '@/utils/request';
import type { RegisterParams, RegisterResult } from '../entries';

/*
id        | int          | NO   | PRI | NULL    | auto_increment |
| name      | varchar(50)  | YES  | UNI | NULL    |                |
| password  | varchar(255) | YES  |     | NULL    |                |
| vector    | text         | YES  |     | NULL    |                |
| pic       | varchar(255) | YES  |     | NULL    |                |
| phone     | varchar(50)  | YES  |     | NULL    |                |
| date      | datetime     | YES  |     | NULL    |                |
| state     | int          | YES  |     | NULL    |                |
| provinces | varchar(50)  | YES  |     | NULL    |                |
| city      | varchar(50)  | YES  |     | NULL    |                |
| area      | varchar(50)  | YES  |     | NULL    |                |
| role      | int          | YES  |     | NULL    |                |
| college   | varchar(50)  |
*/

/** 注册接口 POST /api/user/register */
export async function register(params: RegisterParams) {
  return request<RegisterResult>('/api/user/register', {
    method: 'POST',
    data: params,
  });
}
