import { Task } from '../models/task.model';
import { TaskAction, TaskActionTypes } from '../actions/task.actions';

export interface TaskState {
  list: Task[];
  error: Error;
}

const initialState: TaskState = {
  list: [],
  error: undefined,
};

const sortByDate = (tasks: Task[]) => {
  return tasks.slice().sort((task1, task2) => task1.date - task2.date);
};

export function TaskReducer(
  state: TaskState = initialState,
  action: TaskAction
) {
  switch (action.type) {
    case TaskActionTypes.LOAD_TASK:
      return {
        ...state,
      };
    case TaskActionTypes.LOAD_TASK_SUCCESS:
      return {
        ...state,
        list: sortByDate(action.payload),
      };
    case TaskActionTypes.LOAD_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case TaskActionTypes.ADD_TASK:
      return {
        ...state,
      };
    case TaskActionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
      };
    case TaskActionTypes.ADD_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case TaskActionTypes.DELETE_TASK:
      return {
        ...state,
      };
    case TaskActionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter((task) => task.id !== action.payload), // filter creates a new array
      };
    case TaskActionTypes.DELETE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case TaskActionTypes.EDIT_TASK:
      return {
        ...state,
      };
    case TaskActionTypes.EDIT_TASK_SUCCESS:
      return {
        ...state,
        // list: state.list.map((task) => {
        //   if (task.id === action.payload.id) {
        //     task.name = action.payload.name;
        //   }
        // }),
      };
    case TaskActionTypes.EDIT_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
