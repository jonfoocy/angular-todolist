import { Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export enum TaskActionTypes {
  LOAD_TASK = '[TASK] Load Task',
  LOAD_TASK_SUCCESS = '[TASK] Load Task Success',
  LOAD_TASK_FAILURE = '[TASK] Load Task Failure',
  ADD_TASK = '[TASK] Add Task',
  ADD_TASK_SUCCESS = '[TASK] Add Task Success',
  ADD_TASK_FAILURE = '[TASK] Add Task Failure',
  DELETE_TASK = '[TASK] Delete Task',
  DELETE_TASK_SUCCESS = '[TASK] Delete Task Success',
  DELETE_TASK_FAILURE = '[TASK] Delete Task Failure',
}

export class LoadTaskAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASK;
}

export class LoadTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASK_SUCCESS;

  constructor(public payload: Array<Task>) {}
}

export class LoadTaskFailureAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASK_FAILURE;

  constructor(public payload: Error) {}
}

export class AddTaskAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK;

  constructor(public payload: Task) {}
}

export class AddTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK_SUCCESS;

  constructor(public payload: Task) {}
}

export class AddTaskFailureAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK_FAILURE;

  constructor(public payload: Error) {}
}

export class DeleteTaskAction implements Action {
  readonly type = TaskActionTypes.DELETE_TASK;

  constructor(public payload: string) {}
}

export class DeleteTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.DELETE_TASK_SUCCESS;

  constructor(public payload: string) {}
}

export class DeleteTaskFailureAction implements Action {
  readonly type = TaskActionTypes.DELETE_TASK_FAILURE;

  constructor(public payload: string) {}
}

export type TaskAction =
  | LoadTaskAction
  | LoadTaskSuccessAction
  | LoadTaskFailureAction
  | AddTaskAction
  | AddTaskSuccessAction
  | AddTaskFailureAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | DeleteTaskFailureAction;
