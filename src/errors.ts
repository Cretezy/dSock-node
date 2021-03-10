export interface IApiErrorMetadata {
  url: string;
  baseUrl: string;
  method: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
}

export class dSockApiError extends Error {
  constructor(
    public errorCode: string,
    public error: string,
    public metadata: IApiErrorMetadata
  ) {
    super(`${errorCode}: ${error} (${metadata.method} ${metadata.url})`);

    Object.setPrototypeOf(this, dSockApiError.prototype);
  }
}
