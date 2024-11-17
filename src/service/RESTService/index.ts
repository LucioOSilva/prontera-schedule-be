export interface IRESTResponse<T = any> {
  statusCode?: number | null;
  data?: T | null;
  message?: string | null;
}

export const statusResponseObject = () => {
  return {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error',
  };
};

export const RESTResponse = (
  statusCode: number = 500,
  data: any = null,
  message: string = null,
) => {
  const RESTResponse: IRESTResponse<any> = {
    statusCode: null,
    data: null,
    message: null,
  };

  RESTResponse.statusCode = statusCode;
  RESTResponse.data = data;
  RESTResponse.message = message ? message : null;
  return RESTResponse;
};
