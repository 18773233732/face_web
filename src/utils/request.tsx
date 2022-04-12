import { extend } from 'umi-request';
import { message } from 'antd';
// import { Intl } from '@components';
// import { autoToastErrorCodes } from '@constant/errorCode';

// const { formatMessage } = Intl;

export function showErrorMsg(resp: { code?: string }) {
  const errCode = resp?.code;
  if (errCode) {
    message.error(errCode);
  }
}

export function isSuccess(resp: { code?: string } | undefined) {
  return resp && resp.code === 'success';
}

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  // eslint-disable-next-line no-console
  console.error('request-error', error);
  return response;
};

const request = extend({
  errorHandler,
  timeout: 60000,
});

request.interceptors.request.use((url, options) => {
  const { headers = {} } = options;
  const token = window.localStorage.getItem('token') || '';
  // console.log(token);
  return {
    url,
    options: {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    },
  };
});

request.interceptors.response.use(async (res: Response) => {
  try {
    const respond = await res.clone().json();
    const { errorMessage } = respond;
    if (errorMessage === '') {
      return respond;
    }
    if (
      errorMessage === 'token_expired' ||
      errorMessage === 'token_incorrect'
    ) {
      if (process.env.NODE_ENV === 'development') {
        window.location.pathname = '/user/login';
      }
    }
    return respond;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('request-response-error', error);
    return {};
  }
});

export default request;

// export const getLastPageNumber = (
//   res: {
//     code?: string;
//     result: { list: any[]; page: number; page_size: number; count: number };
//   },
//   currentPage: number | undefined,
// ) => {
//   let pageNumber: number = currentPage || 1;
//   const { code, result } = res || {};
//   const { page, page_size, count, list } = result || {};
//   if (
//     code === 'success' &&
//     currentPage &&
//     currentPage >= page &&
//     list?.length <= 0 &&
//     count &&
//     page_size
//   ) {
//     pageNumber = Math.ceil(count / page_size);
//   }
//   return pageNumber;
// };
