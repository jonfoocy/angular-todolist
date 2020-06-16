import { TaskState, TaskReducer } from './store/reducers/task.reducer';
import {
  AuthState,
  AuthReducer,
  getIsAuth,
} from './store/reducers/auth.reducer';
import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface AppState {
  tasklist: TaskState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasklist: TaskReducer,
  auth: AuthReducer,
};

// export const getTaskState = createFeatureSelector<TaskState>('task');
// export const getTask = createSelector(getTaskState, fromAuth.getIsAuth);

export const getAuthState = createFeatureSelector('auth');
export const getIsAuthenticated = createSelector(getAuthState, getIsAuth);
