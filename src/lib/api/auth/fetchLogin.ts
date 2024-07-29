import { jneAxios } from "../axiosIntercept";
import { apiErrorHandler } from "../errorHandler";
import { IBaseApiResponse } from "../interface";

interface Request {
  username: string;
  password: string;
}

interface Response {
  accessToken: string;
}

export const fetchLogin = async (
  requst: Request
): Promise<IBaseApiResponse<Response | null>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`;
  try {
    const { data } = await jneAxios().post(url, requst);
    return data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};
