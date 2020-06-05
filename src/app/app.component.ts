import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppState } from './store/models/app-state.model';
import { Task } from './store/models/task.model';
import {
  AddTaskAction,
  DeleteTaskAction,
  LoadTaskAction,
  EditTaskAction,
} from './store/actions/task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  taskList$: Observable<any[]>;
  sortedTaskList: Task[];
  error$: Observable<Error>;
  currentTask: Task = { id: '', name: '', date: undefined };
  isTaskBeingEdited = false;

  constructor(
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.taskList$ = this.firestore.collection('tasks').valueChanges();
    this.error$ = this.store.select((store) => store.tasklist.error);

    this.store.dispatch(new LoadTaskAction());
    this.sortTaskList();
  }

  sortTaskList() {
    this.taskList$.subscribe((tasks) => {
      this.sortedTaskList = tasks
        .slice()
        .sort((task1, task2) => task1.date - task2.date);
    });
  }

  addTask(taskName: string) {
    this.currentTask.id = uuidv4();
    this.currentTask.name = taskName;
    this.currentTask.date = new Date();
    this.store.dispatch(new AddTaskAction(this.currentTask));
    this.currentTask = { id: '', name: '', date: undefined };
  }

  deleteTask(id: string) {
    this.store.dispatch(new DeleteTaskAction(id));
  }

  localEditTask(task: Task) {
    this.isTaskBeingEdited = true;
    this.currentTask = task;
  }

  editTask(newTaskName: string) {
    this.currentTask.name = newTaskName;
    this.store.dispatch(new EditTaskAction(this.currentTask));
    this.currentTask = { id: '', name: '', date: undefined };
  }

  onSubmitNewTask(form: NgForm) {
    this.addTask(form.value.task);
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  onSubmitEditTask(form: NgForm) {
    this.editTask(form.value.newTaskName);
    this.isTaskBeingEdited = false;
  }

  cancelEditing() {
    this.isTaskBeingEdited = false;
  }
}
