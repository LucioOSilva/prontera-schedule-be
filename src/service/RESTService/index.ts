export interface IRESTResponse {
  status?: number | null;
  data?: any | null;
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
  status: number = 500,
  data: any = null,
  message: string = null,
) => {
  const RESTResponse: IRESTResponse = {
    status: null,
    data: null,
    message: null,
  };

  RESTResponse.status = status;
  RESTResponse.data = data;
  RESTResponse.message = message ? message : null;
  return RESTResponse;
};
