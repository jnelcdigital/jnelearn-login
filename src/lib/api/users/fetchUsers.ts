import { jneAxios } from "../axiosIntercept";
import { apiErrorHandler } from "../errorHandler";
import { IBaseApiResponse } from "../interface";

interface Request {
  kode_cabang?: string;
  nama_cabang?: string;
  username?: string;
  page?: number;
  size?: number;
}

export interface User {
  id: number;
  kode_cabang: string;
  nama_cabang: string;
  username: string;
}

interface UsersResponse {
  data: User[];
  total: number;
}

export const fetchUsers = async (
  requst: Request
): Promise<IBaseApiResponse<UsersResponse | null>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/users`;
  try {
    const { data } = await jneAxios().post(url, requst);
    return data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};
