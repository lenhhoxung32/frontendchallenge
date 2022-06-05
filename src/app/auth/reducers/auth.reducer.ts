import { createReducer, on } from '@ngrx/store';
import { AuthApiActions } from 'src/app/auth/actions';
import { User } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
}

const initialState: State = { user: null };

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user }))
);

export const getUser = (state: State) => state.user;
