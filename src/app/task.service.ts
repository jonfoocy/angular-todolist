import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Task } from './store/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  getTasks() {
    // return this.http.get<Array<Task>>(this.TASK_URL).pipe(delay(500));
    return this.firestore.collection<Task>('tasks').valueChanges();
  }

  addTask(task: Task) {
    // return this.http.post(this.TASK_URL, task).pipe(delay(500));
    return this.firestore.collection('tasks').add(task);
  }

  findMatchingTask(taskId: string) {
    // return this.http.delete(`${this.TASK_URL}/${id}`).pipe(delay(500));
    console.log('delete task called');
    // console.log(this.firestore.collection('tasks').doc());
    return this.firestore
      .collection('tasks')
      .ref.where('id', '==', taskId)
      .get();
  }

  deleteTask(docId: string) {
    return this.firestore.collection('tasks').doc(docId).delete();
  }
}
