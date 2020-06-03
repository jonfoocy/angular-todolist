import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppState } from './store/models/app-state.model';
import { Task } from './store/models/task.model';
import {
  AddTaskAction,
  DeleteTaskAction,
  LoadTaskAction,
} from './store/actions/task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  taskList$: Observable<Array<Task>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  newTask: Task = { id: '', name: '' };

  constructor(
    private store: Store<AppState> // private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.taskList$ = this.store.select((store) => store.tasklist.list);
    this.loading$ = this.store.select((store) => store.tasklist.loading);
    this.error$ = this.store.select((store) => store.tasklist.error);

    this.store.dispatch(new LoadTaskAction());
    // this.firestore.collection();
  }

  addTask(taskName: string) {
    this.newTask.id = uuidv4();
    this.newTask.name = taskName;
    this.store.dispatch(new AddTaskAction(this.newTask));
    this.newTask = { id: '', name: '' };
  }

  deleteTask(id: string) {
    this.store.dispatch(new DeleteTaskAction(id));
  }

  onSubmit(form: NgForm) {
    this.addTask(form.value.task);
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
