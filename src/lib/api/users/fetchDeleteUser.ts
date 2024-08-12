import { jneAxios } from "../axiosIntercept";
import { apiErrorHandler } from "../errorHandler";
import { IBaseApiResponse } from "../interface";

export const fetchDeleteUser = async (
  id: number
): Promise<IBaseApiResponse<boolean | null>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${id}`;
  try {
    const { data } = await jneAxios().delete(url);
    return data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};
