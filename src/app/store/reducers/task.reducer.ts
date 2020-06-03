import { Task } from '../models/task.model';
import { TaskAction, TaskActionTypes } from '../actions/task.actions';

export interface TaskState {
  list: Task[];
  loading: boolean;
  error: Error;
}

const initialState: TaskState = {
  list: [],
  loading: false,
  error: undefined,
};

export function TaskReducer(
  state: TaskState = initialState,
  action: TaskAction
) {
  switch (action.type) {
    case TaskActionTypes.LOAD_TASK:
      return {
        ...state,
        loading: true,
      };
    case TaskActionTypes.LOAD_TASK_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case TaskActionTypes.LOAD_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case TaskActionTypes.ADD_TASK:
      return {
        ...state,
        loading: true,
      };
    case TaskActionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
    case TaskActionTypes.ADD_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case TaskActionTypes.DELETE_TASK:
      return {
        ...state,
        loading: true,
      };
    case TaskActionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case TaskActionTypes.DELETE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
