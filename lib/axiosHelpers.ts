// https://medium.com/@mike.maslyuk/error-handling-for-network-requests-in-client-side-javascript-applications-with-fetch-axios-bd2cddb3249c
import axios from "axios";
import { APIError, NetworkError } from "./cutomErrorClasses";

interface Error {
  isAxiosError: boolean;
  response: {
    data: {};
    status: number;
  };
}
interface ReqOptions {
  url: string;
  method: string;
  headers: Record<string, string>;
  data: {};
}

function handleAxiosError(err: Error, url: string) {
  if (err.isAxiosError) {
    if (err.response) {
      return new APIError({
        message: "API Error Detected",
        data: err.response?.data,
        statusCode: err.response?.status,
      });
    } else {
      return new NetworkError({
        message: "Network Error!",
        url,
      });
    }
  } else {
    // Standard JavaScript Syntax Error - Bubble this up as it implies an error with the code!
    throw err;
  }
}

const MAX_ATTEMPTS = 3;
const CRR_ATTEMPTS = 1;

async function axiosControlFlow(options: ReqOptions) {
  try {
    const { data } = await axios(options);
    return data;
  } catch (err) {
    return handleAxiosError(err as Error, options.url);
  }
}

async function axiosWithRetry(
  options: ReqOptions,
  CRR_ATTEMPTS: number,
  MAX_ATTEMPTS: number
) {
  console.log(`Attempting Request ${CRR_ATTEMPTS}/${MAX_ATTEMPTS}`);

  const responseOrError = await axiosControlFlow(options);

  if (responseOrError instanceof NetworkError) {
    if (CRR_ATTEMPTS < MAX_ATTEMPTS) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(axiosWithRetry(url, CRR_ATTEMPTS + 1, MAX_ATTEMPTS));
        }, 1000);
      });
    } else {
      console.log("Maximum Attempts Reached");
      return responseOrError;
    }
  } else {
    console.log("Return Valid Data");
    return responseOrError;
  }
}

export async function mainCaller(options: ReqOptions) {
  try {
    const returnedValue = await axiosWithRetry(
      options,
      CRR_ATTEMPTS,
      MAX_ATTEMPTS
    );

    // Always returns 2 kind of objects
    if (returnedValue instanceof Error) {
      // 1. Error one
      return {
        type: "error",
        message: returnedValue.message,
        error: returnedValue,
      };
    }

    // 2. Data one
    return {
      type: "data",
      data: returnedValue,
    };
  } catch (err) {
    // This should never happen unless there's a syntax error with the code
    console.log({
      type: "error",
      error: err,
    });
  }
}
