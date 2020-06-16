import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { AppState } from '../../store/models/app-state.model';
import { Task } from '../../store/models/task.model';
import {
  AddTaskAction,
  DeleteTaskAction,
  LoadTaskAction,
  EditTaskAction,
} from '../../store/actions/task.actions';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  taskList$: Observable<Array<Task>>;
  error$: Observable<Error>;
  taskForm = new FormGroup({
    taskField: new FormControl('', Validators.required),
  });
  currentTask: Task = { id: '', detail: '', date: undefined };
  isTaskBeingEdited = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.taskList$ = this.store.select((store) => store.tasklist.list);
    // this.taskList$.subscribe((task) => console.log(task));

    this.error$ = this.store.select((store) => store.tasklist.error);

    this.store.dispatch(new LoadTaskAction());
  }

  addTask(taskName: string) {
    const newTask = {
      id: uuidv4(),
      detail: taskName,
      date: new Date().valueOf(),
    };
    this.store.dispatch(new AddTaskAction(newTask));
  }

  deleteTask(id: string) {
    this.store.dispatch(new DeleteTaskAction(id));
  }

  localEditTask(task: Task) {
    this.isTaskBeingEdited = true;
    this.currentTask = task;
  }

  editTask(newTaskName: string) {
    const task = { ...this.currentTask };
    task.detail = newTaskName;
    this.store.dispatch(new EditTaskAction(task));
    this.currentTask = { id: '', detail: '', date: undefined };
  }

  onSubmitNewTask() {
    this.addTask(this.taskForm.value.taskField);
    this.taskForm.reset();
  }

  onSubmitEditTask(form: NgForm) {
    this.editTask(form.value.newTaskName);
    this.isTaskBeingEdited = false;
  }

  cancelEditing() {
    this.isTaskBeingEdited = false;
  }
}
