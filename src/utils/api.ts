export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;
const StatusMessage = {
  [HTTP_STATUS.OK]: 'OK',
  [HTTP_STATUS.BAD_REQUEST]: 'Bad Request',
  [HTTP_STATUS.UNAUTHORIZED]: 'Unauthorized',
  [HTTP_STATUS.FORBIDDEN]: 'Forbidden',
  [HTTP_STATUS.NOT_FOUND]: 'Not Found',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error'
} as const;

type ErrorMessage = {
  message: string[] | null;
};

type Data = Record<string | number | symbol, any>;
type ResultSuccess = {
  status: typeof HTTP_STATUS.OK;
  data: Data;
  error: null;
};
type ResultError = {
  status: typeof HTTP_STATUS.BAD_REQUEST | typeof HTTP_STATUS.UNAUTHORIZED | typeof HTTP_STATUS.FORBIDDEN | typeof HTTP_STATUS.NOT_FOUND | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;
  data: null;
  error: ErrorMessage;
};
export type Result = ResultSuccess | ResultError;

export const get = async (url: string): Promise<Result> => {
  // apiがまだできてないのでlocalStorageを使う
  const data = window.localStorage.getItem(url);
  return new Promise((resolve) => {
    if (data) {
      resolve({
        status: HTTP_STATUS.OK,
        data: JSON.parse(data),
        error: null
      });
    } else {
      resolve({
        status: HTTP_STATUS.NOT_FOUND,
        data: null,
        error: {
          message: [StatusMessage[HTTP_STATUS.NOT_FOUND]],
        },
      });
    }
  });
};

export const post = async (url: string, data: Data): Promise<Result> => {
  // apiがまだできてないのでlocalStorageを使う
  window.localStorage.setItem(url, JSON.stringify(data));
  return new Promise((resolve) => {
    resolve({
      status: HTTP_STATUS.OK,
      data,
      error: null
    });
  });
}
