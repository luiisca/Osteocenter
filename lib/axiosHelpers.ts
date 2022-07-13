// https://medium.com/@mike.maslyuk/error-handling-for-network-requests-in-client-side-javascript-applications-with-fetch-axios-bd2cddb3249c
import axios from "axios";
import { APIError, NetworkError } from "./cutomErrorClasses";

const maximumAttempts = 3;
const currentAttempt = 1;

interface Options {
  method: "get" | "post" | "delete";
  url: string;
  data: any;
  headers: any;
}

function handleAxiosError(err: any, url: string) {
  if (err.isAxiosError) {
    if (err.response) {
      return new APIError({
        message: "API Error Detected",
        data: err.response.data,
        statusCode: err.response.status,
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

async function axiosControlFlow(options: Options) {
  try {
    const { data } = await axios(options);
    return data;
  } catch (err) {
    return handleAxiosError(err, options.url);
  }
}

async function axiosWithRetry(
  options: Options,
  currentAttempt: number,
  maximumAttempts: number
) {
  console.log(`Attempting Request ${currentAttempt}/${maximumAttempts}`);

  const responseOrError = await axiosControlFlow(options);
  console.log('responseOrError', responseOrError, responseOrError instanceof NetworkError)

  if (responseOrError instanceof NetworkError) {
    if (currentAttempt < maximumAttempts) {
      console.log('inside retry')
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(axiosWithRetry(options, currentAttempt + 1, maximumAttempts));
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

export async function mainCaller(options: Options) {
  try {
    const returnedValue = await axiosWithRetry(
      options,
      currentAttempt,
      maximumAttempts
    );

    if (returnedValue instanceof Error) {
      return {
        type: "error",
        message: returnedValue.message,
        error: returnedValue,
      };
    }

    return {
      type: "data",
      data: returnedValue,
    };
  } catch (err) {
    // This should never happen unless there's a syntax error with the code
    return {
      type: "error",
      error: err,
    };
  }
}
