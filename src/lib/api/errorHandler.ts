import { IBaseApiResponse } from "./interface";

export const apiErrorHandler = (error: any): IBaseApiResponse<null> => {
  const resData = error?.response?.data?.code ? error.response.data : {};

  if (resData?.code)
    return {
      code: resData?.code,
      message: resData?.message,
      data:
        Array.isArray(resData?.data) && resData?.data.length === 0
          ? null
          : resData?.data, // [] is true in js and the BE response with [] for error
    };

  const resStatus = error?.response?.status ? error?.response?.status : 500;
  const resStatusText = error?.response?.statusText
    ? error.response.statusText
    : "Internal Server Error";

  const errorRes = {
    code: resStatus,
    message: resStatusText,
    data: null,
  };

  return errorRes;
};
