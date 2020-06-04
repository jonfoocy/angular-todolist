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
import { Task } from '../store/models/task.model';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

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
    mergeMap(
      (data) =>
        this.taskService
          .addTask(data.payload)
          .then((result) => {
            if (result) {
              return new AddTaskSuccessAction(data.payload);
            }
          })
          .catch((err) => new AddTaskFailureAction(err))

      // pipe(
      //   map(() => new AddTaskSuccessAction(data.payload)),
      //   catchError((error) => of(new AddTaskFailureAction(error)))
      // )
    )
  );

  @Effect() deleteTask$ = this.actions$.pipe(
    ofType<DeleteTaskAction>(TaskActionTypes.DELETE_TASK),
    mergeMap(
      (data) =>
        this.taskService
          .findMatchingTask(data.payload)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.taskService.deleteTask(doc.id);
            });
            return new DeleteTaskSuccessAction(data.payload);
          })
          .catch((err) => {
            // console.log('DeleteTaskSuccessAction dispatched');
            return new DeleteTaskFailureAction(err);
          })

      // pipe(
      //   map(() => new DeleteTaskSuccessAction(data.payload)),
      //   catchError((error) => of(new DeleteTaskFailureAction(error)))
      // )
    )
  );
}
