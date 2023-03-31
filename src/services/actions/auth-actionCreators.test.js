import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './auth-actions';
import * as actions from './auth-actionCreators';
import { BASE_URL } from '../../utils/Api/api';

describe('auth actions test', () => {
    const fakeUserData = {
        success: true,
        data: { name: 'name', email: 'test@email.ru', accessToken: 'token', refreshToken: 'token' },
      };

      beforeEach(() => {
        jest.resetAllMocks()
        window.alert = jest.fn();
      });

    it('test register user action',() => {
        const name = 'name';
        const email = 'test@email.ru';
        const accessToken = 'secret-token';
        const refreshToken = 'token';

        const expectedAction = {
            type: types.REGISTER_USER,
            name,
            email,
            accessToken,
            refreshToken,
        }

        expect(actions.actionRegisterUser(name,email, accessToken, refreshToken)).toEqual(expectedAction);
    });

    it('test login user action',() => {
        const name = 'name';
        const email = 'test@email.ru';
        const accessToken = 'secret-token';
        const refreshToken = 'token';


        const expectedAction = {
            type: types.LOGIN_USER,
            name,
            email,
            accessToken,
            refreshToken,
        }

        expect(actions.actionLoginUser(name,email, accessToken, refreshToken)).toEqual(expectedAction);
    });

    it('test logout user action',() => {

        const expectedAction = {
            type: types.LOGOUT_USER,
        }

        expect(actions.actionLogoutUser()).toEqual(expectedAction);
    });

    it('test update token action',() => {
        const accessToken = 'secret-token';
        const refreshToken = 'token';

        const expectedAction = {
            type: types.UPDATE_TOKEN,
            accessToken,
            refreshToken,
        }

        expect(actions.actionUpdateToken(accessToken, refreshToken)).toEqual(expectedAction);
    });

    it('test get profile action',() => {
        const name = 'name';
        const email = 'test@email.ru';

        const expectedAction = {
            type: types.GET_DATA_ABOUT_PROFILE,
            name,
            email,
        }

        expect(actions.actionGetProfileData(name, email)).toEqual(expectedAction);
    });

    it('test update profile action',() => {
        const name = 'name';
        const email = 'test@email.ru';

        const expectedAction = {
            type: types.UPDATE_PROFILE_DATA,
            name,
            email,
        }

        expect(actions.actionUpdataProfile(name, email)).toEqual(expectedAction);
    });

    it('test forgot password action',() => {

        const expectedAction = {
            type: types.FORGOT_PASSWORD,
        }

        expect(actions.actionForgotPassword()).toEqual(expectedAction);
    });

    it('test reset password action',() => {

        const expectedAction = {
            type: types.RESET_PASSWORD,
        }

        expect(actions.actionResetPassword()).toEqual(expectedAction);
    });

    it('test reset success password action',() => {

        const expectedAction = {
            type: types.RESET_SUCCESS_INPUT_NEW_PASSWORD,
        }

        expect(actions.actionResetSuccessNewPassword()).toEqual(expectedAction);
    });

    it('test api redister user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.REGISTER_USER,
            name: fakeUserData.data.name,
            email: fakeUserData.data.email,
            accessToken: fakeUserData.data.accessToken,
            refreshToken: fakeUserData.data.refreshToken,
        }
    
        await store.dispatch(actions.apiRegisterUser(fakeUserData.data.name, fakeUserData.data.email, '1234'));
    
        expect(actions.actionRegisterUser(fakeUserData.data.name, 
            fakeUserData.data.email, 
            fakeUserData.data.accessToken,
            fakeUserData.data.refreshToken))
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/auth/register`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }, body: JSON.stringify({
                name: fakeUserData.data.name,
                email: fakeUserData.data.email, 
                password: '1234',
            })
        });
      });

      it('test api login user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.LOGIN_USER,
            name: fakeUserData.data.name,
            email: fakeUserData.data.email,
            accessToken: fakeUserData.data.accessToken,
            refreshToken: fakeUserData.data.refreshToken,
        }
    
        await store.dispatch(actions.apiLoginUser(fakeUserData.data.email, '1234'));
    
        expect(actions.actionLoginUser(fakeUserData.data.name, 
            fakeUserData.data.email, 
            fakeUserData.data.accessToken,
            fakeUserData.data.refreshToken))
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/auth/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }, body: JSON.stringify({
                email: fakeUserData.data.email, 
                password: '1234',
            })
        });
      });

      it('test api logout user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.LOGOUT_USER,
        }
    
        await store.dispatch(actions.apiLogoutUser('token'));
    
        expect(actions.actionLogoutUser())
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/auth/logout`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }, body: JSON.stringify({
                token: 'token'
            })
        });
      });

      it('test api update token user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.UPDATE_TOKEN,
            accessToken: fakeUserData.data.accessToken,
            refreshToken: fakeUserData.data.refreshToken,
        }
    
        await store.dispatch(actions.apiUpdateToken('token'));
    
        expect(actions.actionUpdateToken(fakeUserData.data.accessToken, fakeUserData.data.refreshToken))
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/auth/token`,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }, body: JSON.stringify({
                token: 'token'
            })
        });
      });

      it('test api get profile user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.GET_DATA_ABOUT_PROFILE,
            name: fakeUserData.data.name,
            email: fakeUserData.data.email,
        }
    
        await store.dispatch(actions.apiGetProfile('token'));
    
        expect(actions.actionGetProfileData(fakeUserData.data.name, fakeUserData.data.email))
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/auth/user`,{
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '
            }
        });
      });

      it('test api update profile user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.UPDATE_PROFILE_DATA,
            name: fakeUserData.data.name,
            email: fakeUserData.data.email,
        }
    
        await store.dispatch(actions.apiUpdateProfile(
            fakeUserData.data.name, 
            fakeUserData.data.email));
    
        expect(actions.actionUpdataProfile(fakeUserData.data.name, fakeUserData.data.email))
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/auth/user`,{
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '
            }, body: JSON.stringify({
                name: fakeUserData.data.name,
                email: fakeUserData.data.email,
            })
        });
      });

      it('test api forgot password user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.FORGOT_PASSWORD,
        }
    
        await store.dispatch(actions.apiForgotPassword(fakeUserData.data.email));
    
        expect(actions.actionForgotPassword())
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/password-reset`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }, body: JSON.stringify({
                email: fakeUserData.data.email,
            })
        });
      });

      it('test api reset password user', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeUserData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.RESET_PASSWORD,
        }
    
        await store.dispatch(actions.apiResetPassword('1234', 'token'));
    
        expect(actions.actionResetPassword())
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/password-reset/reset`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }, body: JSON.stringify({
                password: '1234',
                token: 'token',
            })
        });
      });

});

