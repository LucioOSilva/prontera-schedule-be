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
  return {
    statusCode: statusCode,
    data,
    message: message ? (Array.isArray(message) ? message[0] : message) : null,
  } as IRESTResponse<any>;
};
