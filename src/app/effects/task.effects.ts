import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  LoadTaskAction,
  TaskActionTypes,
  LoadTaskSuccessAction,
  LoadTaskFailureAction,
  AddTaskAction,
  AddTaskSuccessAction,
  AddTaskFailureAction,
  DeleteTaskAction,
  DeleteTaskSuccessAction,
  DeleteTaskFailureAction,
} from '../store/actions/task.actions';
import { TaskService } from '../task.service';

@Injectable()
export class TaskEffects {
  @Effect() loadTask$ = this.actions$.pipe(
    ofType<LoadTaskAction>(TaskActionTypes.LOAD_TASK),
    mergeMap(() =>
      this.taskService.getTasks().pipe(
        map((data) => new LoadTaskSuccessAction(data)),
        catchError((error) => of(new LoadTaskFailureAction(error)))
      )
    )
  );

  @Effect() addTask$ = this.actions$.pipe(
    ofType<AddTaskAction>(TaskActionTypes.ADD_TASK),
    mergeMap((data) =>
      this.taskService.addTask(data.payload).pipe(
        map(() => new AddTaskSuccessAction(data.payload)),
        catchError((error) => of(new AddTaskFailureAction(error)))
      )
    )
  );

  @Effect() deleteTask$ = this.actions$.pipe(
    ofType<DeleteTaskAction>(TaskActionTypes.DELETE_TASK),
    mergeMap((data) =>
      this.taskService.deleteTask(data.payload).pipe(
        map(() => new DeleteTaskSuccessAction(data.payload)),
        catchError((error) => of(new DeleteTaskFailureAction(error)))
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
