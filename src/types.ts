export interface IApiSuccessResponse {
  success: true;
}

export interface IApiErrorResponse {
  success: false;
  error: string;
  errorCode: string;
}

export interface ICreateClaimOptions {
  user: string;
  session?: string;
  id?: string;
  channels?: string[];
  time?: { expiration: number } | { duration: number };
}

interface IClaim {
  id: string;
  user: string;
  session?: string;
  channels: string[];
  expiration: number;
}

export interface IApiCreateClaimResponse extends IApiSuccessResponse {
  claim: IClaim;
}

export interface ISendOptions {
  data: string | Buffer;

  user?: string;
  session?: string;
  channel?: string;
  id?: string;
}

export interface IApiSendResponse extends IApiSuccessResponse {}

export interface IInfoOptions {
  user?: string;
  session?: string;
  channel?: string;
  id?: string;
}

export interface IInfoConnection {
  id: string;
  worker: string;
  lastPing: number;
  user: string;
  session?: string;
  channels: string[];
}

export interface IInfoClaim {
  id: string;
  expiration: number;
  user: string;
  session?: string;
}

export interface IApiInfoResponse extends IApiSuccessResponse {
  connections: IInfoConnection[];
  claims: IInfoClaim[];
}

export interface IDisconnectOptions {
  user?: string;
  session?: string;
  channel?: string;
  id?: string;
  keepClaims?: boolean;
}

export interface IApiDisconnectResponse extends IApiSuccessResponse {}

export interface IChannelOptions {
  user?: string;
  session?: string;
  channel?: string;
  id?: string;
}

export interface IApiChannelResponse extends IApiSuccessResponse {}
