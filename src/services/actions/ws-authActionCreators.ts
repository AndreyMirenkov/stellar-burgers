import { WS_AUTH_CONNECTION_START, 
    WS_AUTH_CONNECTION_SUCCESS, 
    WS_AUTH_GET_MESSAGE, 
    WS_AUTH_SEND_MESSAGE, 
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_WATCH_ORDER,
    WS_AUTH_DELETE_WATCH_ORDER } from "./ws-authAction";

import { TWsResponse } from "../../utils/typescriptTypes/wsResponse";
import { TDataWatchOrder } from "../../utils/typescriptTypes/watchOrder";


export interface IWsConnectionStart {
    readonly type: typeof WS_AUTH_CONNECTION_START,
    readonly payload: string,
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_AUTH_CONNECTION_SUCCESS,
    readonly payload?: any,
}

export interface IWsGetMessage {
    readonly type: typeof WS_AUTH_GET_MESSAGE,
    readonly payload: TWsResponse,
}

export interface IWsSendMessage {
    readonly type: typeof WS_AUTH_SEND_MESSAGE,
    readonly payload: any,
}

export interface IWsConnectionError {
    readonly type: typeof WS_AUTH_CONNECTION_ERROR,
    readonly payload?: any,
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_AUTH_CONNECTION_CLOSED,
    readonly payload?: any,
}

export interface IWsWatchOrder {
    readonly type: typeof WS_AUTH_WATCH_ORDER,
    readonly payload: TDataWatchOrder
}

export interface IWsDeleteWatchOrder {
    readonly type: typeof WS_AUTH_DELETE_WATCH_ORDER,
    readonly payload?: any
}

export type TWSAuthAction = | IWsConnectionStart 
| IWsConnectionSuccess 
| IWsGetMessage 
| IWsSendMessage 
| IWsConnectionError 
| IWsConnectionClosed 
| IWsWatchOrder 
| IWsDeleteWatchOrder;



export const wsAuthConnectionStart = (payload: string): IWsConnectionStart => {
    return {
        type: WS_AUTH_CONNECTION_START,
        payload
    }
}

export const wsAuthConnectionSuccess = (): IWsConnectionSuccess => {
    return {
        type: WS_AUTH_CONNECTION_SUCCESS,
    }
}
export const wsAuthGetMessage = (payload: TWsResponse): IWsGetMessage => {
    return {
        type: WS_AUTH_GET_MESSAGE,
        payload,
    }
}

export const wsAuthSendMessage = (payload: any): IWsSendMessage => {
    return {
        type: WS_AUTH_SEND_MESSAGE,
        payload,
    }
}

export const wsAuthConnectionError = (): IWsConnectionError => {
    return {
        type: WS_AUTH_CONNECTION_ERROR,
    }
}

export const wsAuthConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_AUTH_CONNECTION_CLOSED,
    }
}

export const wsAuthWatchOrder = (payload: TDataWatchOrder): IWsWatchOrder => {
        return {
            type: WS_AUTH_WATCH_ORDER,
            payload
        }
}

export const wsAuthDeleteWatchOrder = (): IWsDeleteWatchOrder => {
    return {
        type: WS_AUTH_DELETE_WATCH_ORDER,
    }
}
