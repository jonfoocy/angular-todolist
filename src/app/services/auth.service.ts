import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from '../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import {
  SetAuthenticatedAction,
  SetUnauthenticatedAction,
} from '../store/actions/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<AuthState>,
    private snackbar: MatSnackBar
  ) {}

  signup(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('User created');
        this.store.dispatch(new SetAuthenticatedAction());
        this.router.navigate(['todolist']);
      })
      .catch((err) => {
        this.showSnackbar(err.message, null, 3000);
      });
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('Logged In');
        this.store.dispatch(new SetAuthenticatedAction());
        this.router.navigate(['todolist']);
      })
      .catch((err) => {
        this.showSnackbar(err.message, null, 3000);
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        this.store.dispatch(new SetUnauthenticatedAction());
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.showSnackbar(err.message, null, 3000);
      });
  }

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, { duration });
  }
}
