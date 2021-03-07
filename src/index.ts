import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { dSockApiError } from "./errors";
import {
  IApiCreateClaimResponse,
  IApiErrorResponse,
  IApiInfoResponse,
  IApiSendResponse,
  IApiSuccessResponse,
  ICreateClaimOptions,
  IInfoOptions,
  ISendOptions,
  IDisconnectOptions,
  IApiDisconnectResponse,
  IChannelOptions,
  IApiChannelResponse,
} from "./types";

export class dSockClient {
  private readonly axios: AxiosInstance;

  /**
   * @param baseUrl The dSock API endpoint (without trailing slash)
   * @param token The dSock API token (to authorize requests)
   */
  constructor(baseUrl: string, token: string) {
    this.axios = Axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createClaim(options: ICreateClaimOptions) {
    return await this.request<IApiCreateClaimResponse>({
      url: "/claim",
      method: "POST",
      params: {
        user: options.user,
        session: options.session,
        id: options.id,
        channels: options.channels?.join(","),
        ...options.time,
      },
    });
  }

  async send(options: ISendOptions) {
    return await this.request<IApiSendResponse>({
      url: "/send",
      method: "POST",
      data: options.data,
      params: {
        user: options.user,
        session: options.session,
        id: options.id,
        channel: options.channel,
        type: Buffer.isBuffer(options.data) ? "binary" : "text",
      },
    });
  }

  async disconnect(options: IDisconnectOptions) {
    return await this.request<IApiDisconnectResponse>({
      url: "/disconnect",
      method: "POST",
      params: {
        user: options.user,
        session: options.session,
        id: options.id,
        channel: options.channel,
        keepClaims: options.keepClaims,
      },
    });
  }

  async info(options: IInfoOptions) {
    return await this.request<IApiInfoResponse>({
      url: "/info",
      method: "GET",
      params: {
        user: options.user,
        session: options.session,
        id: options.id,
        channel: options.channel,
      },
    });
  }

  async channelSubscribe(channel: string, options: IChannelOptions) {
    return await this.request<IApiChannelResponse>({
      url: `/channel/subscribe/${channel}`,
      method: "POST",
      params: {
        user: options.user,
        session: options.session,
        id: options.id,
        channel: options.channel,
      },
    });
  }

  async channelUnsubscribe(channel: string, options: IChannelOptions) {
    return await this.request<IApiChannelResponse>({
      url: `/channel/unsubscribe/${channel}`,
      method: "POST",
      params: {
        user: options.user,
        session: options.session,
        id: options.id,
        channel: options.channel,
      },
    });
  }

  private async request<T extends IApiSuccessResponse>(
    options: AxiosRequestConfig
  ) {
    const response = await this.axios.request<T | IApiErrorResponse>({
      ...options,
      validateStatus: () => true,
    });

    if (!response.headers["content-type"]?.includes("application/json")) {
      throw new dSockApiError(
        response.status.toString(),
        "Did not receive JSON"
      );
    }

    if (response.data.success === false) {
      throw new dSockApiError(response.data.errorCode, response.data.error);
    }

    if (response.status >= 400) {
      throw new dSockApiError(response.status.toString(), response.statusText);
    }

    return response.data;
  }
}

export class dSockCloudClient extends dSockClient {
  /**
   * @param projectId The dSock Cloud project ID
   * @param key The dSock Cloud project key
   */
  constructor(projectId: string, key: string) {
    super(`https://api.dsock.cloud/${projectId}`, key);
  }
}
