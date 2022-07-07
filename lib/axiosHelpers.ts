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

async function axiosControlFlow(url: string) {
  try {
    const { data } = await axios(url);
    return data;
  } catch (err) {
    return handleAxiosError(err as Error, url);
  }
}

async function axiosWithRetry(
  url: string,
  CRR_ATTEMPTS: number,
  MAX_ATTEMPTS: number
) {
  console.log(`Attempting Request ${CRR_ATTEMPTS}/${MAX_ATTEMPTS}`);

  const responseOrError = await axiosControlFlow(url);

  if (responseOrError instanceof NetworkError) {
    if (CRR_ATTEMPTS < MAX_ATTEMPTS) {
      return new Promise((resolve) => {
        resolve(axiosWithRetry(url, CRR_ATTEMPTS + 1, MAX_ATTEMPTS));
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

const MAX_ATTEMPTS = 10;
const CRR_ATTEMPTS = 1;

export async function mainCaller(url: string) {
  try {
    const returnedValue = await axiosWithRetry(url, CRR_ATTEMPTS, MAX_ATTEMPTS);

    if (returnedValue instanceof Error) {
      return console.log({
        type: "error",
        message: returnedValue.message,
        error: returnedValue,
      });
    }

    return console.log({
      type: "data",
      data: returnedValue,
    });
  } catch (err) {
    // This should never happen unless there's a syntax error with the code
    console.log({
      type: "error",
      error: err,
    });
  }
}
