import { IBaseApiResponse } from "./interface";

export const apiErrorHandler = (error: any): IBaseApiResponse<null> => {
  const resData = error?.response?.data ? error.response.data : {};

  if (resData?.statusCode) {
    return {
      statusCode: resData?.statusCode,
      message: resData?.message,
      data:
        Array.isArray(resData?.data) && resData?.data.length === 0
          ? null
          : resData?.data, // [] is true in js and the BE response with [] for error
    };
  }

  const resStatus = error?.response?.status ? error?.response?.status : 500;
  const resStatusText = error?.response?.message
    ? error.response.message
    : "Internal Server Error";

  const errorRes = {
    statusCode: resStatus,
    message: resStatusText,
    data: null,
  };

  return errorRes;
};
