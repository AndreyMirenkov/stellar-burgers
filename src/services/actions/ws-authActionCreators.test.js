import * as types from './ws-authAction';
import * as actions from './ws-authActionCreators';

describe('auth actions test', () => {

    it('test ws auth connection start action',() => {
        const payload = 'server'

        const expectedAction = {
            type: types.WS_AUTH_CONNECTION_START,
            payload,
        }

        expect(actions.wsAuthConnectionStart(payload)).toEqual(expectedAction);
    });

    it('test ws auth connection success action',() => {

        const expectedAction = {
            type: types.WS_AUTH_CONNECTION_SUCCESS,
        }

        expect(actions.wsAuthConnectionSuccess()).toEqual(expectedAction);
    });

    it('test ws auth get message action',() => {
        const payload = 'message';

        const expectedAction = {
            type: types.WS_AUTH_GET_MESSAGE,
            payload,
        }

        expect(actions.wsAuthGetMessage(payload)).toEqual(expectedAction);
    });

    it('test ws auth send message action',() => {
        const payload = 'message'

        const expectedAction = {
            type: types.WS_AUTH_SEND_MESSAGE,
            payload,
        }

        expect(actions.wsAuthSendMessage(payload)).toEqual(expectedAction);
    });

    it('test ws auth connection error action',() => {

        const expectedAction = {
            type: types.WS_AUTH_CONNECTION_ERROR,
        }

        expect(actions.wsAuthConnectionError()).toEqual(expectedAction);
    });

    it('test ws auth connection closed action',() => {

        const expectedAction = {
            type: types.WS_AUTH_CONNECTION_CLOSED,
        }

        expect(actions.wsAuthConnectionClosed()).toEqual(expectedAction);
    });

    it('test ws auth watch order action',() => {
        const payload = {number: '1', name: 'name'};

        const expectedAction = {
            type: types.WS_AUTH_WATCH_ORDER,
            payload,
        }

        expect(actions.wsAuthWatchOrder(payload)).toEqual(expectedAction);
    });

    it('test ws auth delete watch order action',() => {

        const expectedAction = {
            type: types.WS_AUTH_DELETE_WATCH_ORDER,
        }

        expect(actions.wsAuthDeleteWatchOrder()).toEqual(expectedAction);
    });

});