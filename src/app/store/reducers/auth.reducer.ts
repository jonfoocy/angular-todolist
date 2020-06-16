import { AuthAction, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthAction
) {
  switch (action.type) {
    case AuthActionTypes.SET_AUTHENTICATED:
      return { isAuthenticated: true };
    case AuthActionTypes.SET_UNAUTHENTICATED:
      return { isAuthenticated: false };
    default:
      return state;
  }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated;
