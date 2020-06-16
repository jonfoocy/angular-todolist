import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store
      .select(fromRoot.getIsAuthenticated)
      .pipe(take(10));
  }

  onLogout() {
    this.authService.logout();
  }
}
