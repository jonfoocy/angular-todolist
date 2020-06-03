import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay } from 'rxjs/operators';
import { Task } from './store/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private TASK_URL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Array<Task>>(this.TASK_URL).pipe(delay(500));
  }

  addTask(task: Task) {
    return this.http.post(this.TASK_URL, task).pipe(delay(500));
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.TASK_URL}/${id}`).pipe(delay(500));
  }
}
