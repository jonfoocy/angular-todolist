import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

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
  EditTaskAction,
  EditTaskSuccessAction,
  EditTaskFailureAction,
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
        map((tasks) => {
          return new LoadTaskSuccessAction(tasks);
        }),
        catchError((error) => of(new LoadTaskFailureAction(error)))
      )
    )
  );

  @Effect() addTask$ = this.actions$.pipe(
    ofType<AddTaskAction>(TaskActionTypes.ADD_TASK),
    mergeMap((action) =>
      this.taskService
        .addTask(action.payload)
        .then((result) => {
          if (result) {
            return new AddTaskSuccessAction(action.payload);
          }
        })
        .catch((err) => new AddTaskFailureAction(err))
    )
  );

  @Effect() deleteTask$ = this.actions$.pipe(
    ofType<DeleteTaskAction>(TaskActionTypes.DELETE_TASK),
    mergeMap((action) =>
      this.taskService
        .findMatchingTask(action.payload)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.taskService.deleteTask(doc.id);
          });
          return new DeleteTaskSuccessAction(action.payload);
        })
        .catch((err) => {
          return new DeleteTaskFailureAction(err);
        })
    )
  );

  @Effect() editTask$ = this.actions$.pipe(
    ofType<EditTaskAction>(TaskActionTypes.EDIT_TASK),
    mergeMap((action) =>
      this.taskService
        .findMatchingTask(action.payload.id)
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.taskService.editTask(doc.id, action.payload.name);
          });
          return new EditTaskSuccessAction(action.payload);
        })
        .catch((err) => {
          return new EditTaskFailureAction(err);
        })
    )
  );
}
