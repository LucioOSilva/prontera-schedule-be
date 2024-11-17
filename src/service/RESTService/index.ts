export interface IRESTResponse<T> {
  statusCode?: number | null;
  data?: T | null;
  message?: string | null;
}

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
