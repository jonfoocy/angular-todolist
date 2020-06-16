import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SET_AUTHENTICATED = '[AUTH] Set Authenticated',
  SET_UNAUTHENTICATED = '[AUTH] Set Unauthenticated',
}

export class SetAuthenticatedAction implements Action {
  readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnauthenticatedAction implements Action {
  readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}

export type AuthAction = SetAuthenticatedAction | SetUnauthenticatedAction;
