import { Task } from './task.model';
import { TaskState } from '../reducers/task.reducer';

export interface AppState {
  readonly tasklist: TaskState;
}
