import * as types from './ws-action';
import * as actions from './ws-actionCreators';

describe('auth actions test', () => {

    it('test ws connection start action',() => {
        const payload = 'server'
        const expectedAction = {
            type: types.WS_CONNECTION_START,
            payload,
        }

        expect(actions.wsConnectionStart(payload)).toEqual(expectedAction);
    });

    it('test ws connection success action',() => {

        const expectedAction = {
            type: types.WS_CONNECTION_SUCCESS,
        }

        expect(actions.wsConnectionSuccess()).toEqual(expectedAction);
    });

    it('test ws get message action',() => {
        const payload = 'message';

        const expectedAction = {
            type: types.WS_GET_MESSAGE,
            payload,
        }

        expect(actions.wsGetMessage(payload)).toEqual(expectedAction);
    });

    it('test ws send message action',() => {
        const payload = 'message'

        const expectedAction = {
            type: types.WS_SEND_MESSAGE,
            payload,
        }

        expect(actions.wsSendMessage(payload)).toEqual(expectedAction);
    });

    it('test ws connection error action',() => {

        const expectedAction = {
            type: types.WS_CONNECTION_ERROR,
        }

        expect(actions.wsConnectionError()).toEqual(expectedAction);
    });

    it('test ws connection closed action',() => {

        const expectedAction = {
            type: types.WS_CONNECTION_CLOSED,
        }

        expect(actions.wsConnectionClosed()).toEqual(expectedAction);
    });

    it('test ws watch order action',() => {
        const payload = {number: '1', name: 'name'};

        const expectedAction = {
            type: types.WS_WATCH_ORDER,
            payload,
        }

        expect(actions.wsWatchOrder(payload)).toEqual(expectedAction);
    });

    it('test ws delete watch order action',() => {

        const expectedAction = {
            type: types.WS_DELETE_WATCH_ORDER,
        }

        expect(actions.wsDeleteWatchOrder()).toEqual(expectedAction);
    });

});