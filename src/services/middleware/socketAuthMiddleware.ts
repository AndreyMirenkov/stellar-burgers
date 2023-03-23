import type { Middleware, MiddlewareAPI } from 'redux';
import { TWSAuthAction } from '../actions/ws-authActionCreators';
import type { AppDispatch, RootState } from '../../utils/types';


import { WS_AUTH_CONNECTION_START, 
    WS_AUTH_CONNECTION_SUCCESS, 
    WS_AUTH_GET_MESSAGE, 
    WS_AUTH_SEND_MESSAGE, 
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED } from "../actions/ws-authAction";

export const wsAuthActions = {
wsInit: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_AUTH_SEND_MESSAGE,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_MESSAGE
}

export const socketAuthMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSAuthAction) => {
    
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {wsInit, onOpen, onMessage, wsSendMessage, onError, onClose } = wsAuthActions
 
      if (type === wsInit) {
        socket = new WebSocket(payload);
      } 

      if (type === onClose) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
};