export class dSockApiError extends Error {
  constructor(public errorCode: string, public error: string) {
    super(`${errorCode}: ${error}`);

    Object.setPrototypeOf(this, dSockApiError.prototype);
  }
}
