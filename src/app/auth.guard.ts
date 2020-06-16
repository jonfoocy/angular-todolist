import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import * as fromRoot from '../app/app.reducer';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.AppState>) {}

  canActivate() {
    // this.store
    //   .select(fromRoot.getIsAuthenticated)
    //   .subscribe((data) => console.log(data));
    return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }
}
