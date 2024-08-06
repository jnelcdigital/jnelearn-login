import { jneAxios } from "../axiosIntercept";
import { apiErrorHandler } from "../errorHandler";
import { IBaseApiResponse } from "../interface";

interface Request {
  username: string;
  password: string;
}

export const fetchForgotPassword = async (
  requst: Request
): Promise<IBaseApiResponse<boolean | null>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/forgot-password`;
  try {
    const { data } = await jneAxios().post(url, requst);
    return data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};
