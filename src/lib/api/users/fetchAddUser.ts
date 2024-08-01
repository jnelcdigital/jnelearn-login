import { jneAxios } from "../axiosIntercept";
import { apiErrorHandler } from "../errorHandler";
import { IBaseApiResponse } from "../interface";

interface Request {
  kode_cabang: string;
  nama_cabang: string;
  username: string;
  password: string;
  role: string;
}

interface Response {
  id: number;
  kode_cabang: string;
  nama_cabang: string;
  username: string;
  password: string;
  role: string;
}

export const fetchAddUser = async (
  requst: Request
): Promise<IBaseApiResponse<Response | null>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/user`;
  try {
    const { data } = await jneAxios().post(url, requst);
    return data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};
