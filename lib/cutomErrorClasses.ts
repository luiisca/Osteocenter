export class APIError extends Error {
  data: {};
  statusCode: number;

  constructor({
    message,
    data,
    statusCode,
  }: {
    message: string;
    data: {};
    statusCode: number;
  }) {
    super(message);
    this.name = "APIError";
    this.data = data;
    this.statusCode = statusCode;
  }
}

export class NetworkError extends Error {
  name: string;
  url: string;

  constructor({ message, url }: { message: string; url: string }) {
    super(message);
    this.name = "NetworkError";
    this.url = url;
  }
}
