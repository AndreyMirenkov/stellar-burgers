import { authReducer } from "./auth-reducer";
import * as types from '../actions/auth-actions';

const user = {
    name: 'name',
    email: 'test@email.ru',
    accessToken: 'secret-token',
    refreshToken: 'token',
}

describe('test auth reducer', () => {
    

    it('test initial state reducer', () => {
        expect(authReducer(undefined,{})).toEqual({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        })
    });

    it('test register user', () => {
        expect(authReducer({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.REGISTER_USER,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        })).toEqual({
            loggedIn: true,
            name: user.name,
            email: user.email,
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                time: new Date(),
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        })
    });

    it('test login user', () => {
        expect(authReducer({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.LOGIN_USER,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        })).toEqual({
            loggedIn: true,
            name: user.name,
            email: user.email,
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                time: new Date(),
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        })
    });

    it('test update profile user', () => {
        expect(authReducer({
            loggedIn: false,
            name: 'name1',
            email: 'email@email.ru',
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.UPDATE_PROFILE_DATA,
            name: user.name,
            email: user.email,
        })).toEqual({
            loggedIn: false,
            name: user.name,
            email: user.email,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null,
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        })
    });

    it('test logout user', () => {
        expect(authReducer({
            loggedIn: false,
            name: user.name,
            email: user.email,
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                time: new Date(),
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.LOGOUT_USER,
        })).toEqual({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null,
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        })
    });

    it('test get data profile user', () => {
        expect(authReducer({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.GET_DATA_ABOUT_PROFILE,
            name: user.name,
            email: user.email,
        })).toEqual({
            loggedIn: false,
            name: user.name,
            email: user.email,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null,
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        })
    });

    it('test update token user', () => {
        expect(authReducer({
            loggedIn: false,
            name: 'name',
            email: 'test@email.ru',
            token: {
                accessToken: 'old secret token',
                refreshToken: 'old token',
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.UPDATE_TOKEN,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        })).toEqual({
            loggedIn: true,
            name: 'name',
            email: 'test@email.ru',
            token: {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
                time: new Date(),
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        })
    });

    it('test forgot password user', () => {
        expect(authReducer({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.FORGOT_PASSWORD,
        })).toEqual({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null,
            },
            openResetPassword: {
            inputEmailOnForgotPage: true
            },
            resetPassword: false,
        })
    });

    it('test reset password user', () => {
        expect(authReducer({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.RESET_PASSWORD,
        })).toEqual({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null,
            },
            openResetPassword: {
            inputEmailOnForgotPage: false,
            },
            resetPassword: true,
        })
    });

    it('test reset success password user', () => {
        expect(authReducer({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null
            },
            openResetPassword: {
            inputEmailOnForgotPage: false
            },
            resetPassword: false,
        }, {
            type: types.RESET_SUCCESS_INPUT_NEW_PASSWORD,
        })).toEqual({
            loggedIn: false,
            name: null,
            email: null,
            token: {
                accessToken: null,
                refreshToken: null,
                time: null,
            },
            openResetPassword: {
            inputEmailOnForgotPage: false,
            },
            resetPassword: false,
        })
    });
})