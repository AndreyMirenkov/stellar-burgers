import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from '../../index';
import { TMainActions } from '../../services/actions/actionCreators';
import { TAuthActions } from '../../services/actions/auth-actionCreators';
import { TWSAction } from '../../services/actions/ws-actionCreators';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TMainActions | TAuthActions | TWSAction;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 