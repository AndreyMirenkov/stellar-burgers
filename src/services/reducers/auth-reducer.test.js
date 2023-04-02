import { authReducer, initialState } from "./auth-reducer";
import * as types from '../actions/auth-actions';

const user = {
    name: 'name',
    email: 'test@email.ru',
    accessToken: 'secret-token',
    refreshToken: 'token',
}

describe('test auth reducer', () => {
    

    it('test initial state reducer', () => {
        expect(authReducer(undefined,{})).toEqual(initialState)
    });

    it('test register user', () => {
        expect(authReducer(initialState, {
            type: types.REGISTER_USER,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        })).toEqual({
            ...initialState,
            loggedIn: true,
            name: user.name,
            email: user.email,
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            },
        })
    });

    it('test login user', () => {
        expect(authReducer(initialState, {
            type: types.LOGIN_USER,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        })).toEqual({
            ...initialState,
            loggedIn: true,
            name: user.name,
            email: user.email,
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            },
        })
    });

    it('test update profile user', () => {
        expect(authReducer({
            ...initialState,
            name: 'name1',
            email: 'email@email.ru',
        }, {
            type: types.UPDATE_PROFILE_DATA,
            name: user.name,
            email: user.email,
        })).toEqual({
            ...initialState,
            name: user.name,
            email: user.email,
        })
    });

    it('test logout user', () => {
        expect(authReducer({
            ...initialState,
            loggedIn: true,
            name: user.name,
            email: user.email,
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            },
        }, {
            type: types.LOGOUT_USER,
        })).toEqual(initialState)
    });

    it('test get data profile user', () => {
        expect(authReducer(initialState, {
            type: types.GET_DATA_ABOUT_PROFILE,
            name: user.name,
            email: user.email,
        })).toEqual({
            ...initialState,
            name: user.name,
            email: user.email,
        })
    });

    it('test update token user', () => {
        expect(authReducer({
            ...initialState,
            token: {
                accessToken: 'old secret token',
                refreshToken: 'old token',
            },
        }, {
            type: types.UPDATE_TOKEN,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        })).toEqual({
            ...initialState,
            loggedIn: true,
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            },
        })
    });

    it('test forgot password user', () => {
        expect(authReducer(initialState, {
            type: types.FORGOT_PASSWORD,
        })).toEqual({
            ...initialState,
            openResetPassword: {
                inputEmailOnForgotPage: true
            },
        })
    });

    it('test reset password user', () => {
        expect(authReducer(initialState, {
            type: types.RESET_PASSWORD,
        })).toEqual({
            ...initialState,
            resetPassword: true,
        })
    });

    it('test reset success password user', () => {
        expect(authReducer({
            ...initialState,
            resetPassword: true,
        }, {
            type: types.RESET_SUCCESS_INPUT_NEW_PASSWORD,
        })).toEqual({
            ...initialState,
            resetPassword: false,
        })
    });
})