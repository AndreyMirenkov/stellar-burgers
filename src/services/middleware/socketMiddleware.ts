// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';
import { TWSAction } from '../actions/ws-actionCreators';
import type { AppDispatch, RootState } from '../../utils/types';

import { WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE, 
    WS_SEND_MESSAGE, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_CLOSED } from '../actions/ws-action';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {wsInit, onOpen, onMessage, wsSendMessage, onError, onClose }  = wsActions
 
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (type === onClose) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: 'WS_GET_MESSAGE', payload: JSON.parse(data) });
        };

        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
};