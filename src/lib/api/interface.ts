export interface IBaseApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
