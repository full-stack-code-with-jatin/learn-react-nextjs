import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

declare type AxiosDataFetcherOptions = {
    onReq?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onReqError?: (error: unknown) => unknown;
    onRes?: (serverRes: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    onResError?: (error: unknown) => unknown;
}

export type AxiosDataFetcherConfig = AxiosRequestConfig & AxiosDataFetcherOptions;

export class AxiosDataFetcher {
    private instance;

    constructor(dataFetcherConfig: AxiosDataFetcherConfig = {}) {
        const {
            onReq,
            onRes,
            onReqError,
            onResError,
            ...axiosConfig
        } = dataFetcherConfig;
        if (axiosConfig.withCredentials === undefined) {
            axiosConfig.withCredentials = true;
        }
        this.instance = axios.create(axiosConfig);
    }

    fetch<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
        return this.instance.request({
            url,
            method: data ? 'POST' : 'GET',
            data
        });
    }

    put<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
        return this.instance.request({
            url,
            method: 'PUT',
            data
        });
    }
}

export function dataFetcher<ResponseType>(
    url: string,
    data?: unknown
): Promise<AxiosResponse<ResponseType>> {
    return new AxiosDataFetcher().fetch(url, data);
}