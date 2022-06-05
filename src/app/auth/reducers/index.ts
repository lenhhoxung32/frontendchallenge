import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromAuth from 'src/app/auth/reducers/auth.reducer';
import * as fromRoot from 'src/app/reducers';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
  })(state, action);
}

/**
 * - Auth Selector
 */
export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state.status
);
export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);
