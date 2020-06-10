import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Task } from './store/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  getTasks() {
    // valueChanges() returns an Observable
    return this.firestore.collection<Task>('tasks').valueChanges();
  }

  addTask(task: Task) {
    return this.firestore.collection('tasks').add(task);
  }

  findMatchingTask(taskId: string) {
    return this.firestore
      .collection('tasks')
      .ref.where('id', '==', taskId)
      .get();
  }

  deleteTask(docId: string) {
    return this.firestore.collection('tasks').doc(docId).delete();
  }

  editTask(docId: string, newTask: string) {
    return this.firestore
      .collection('tasks')
      .doc(docId)
      .update({ name: newTask });
  }
}
