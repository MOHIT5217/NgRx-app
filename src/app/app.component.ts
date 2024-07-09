import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from './app-state/app.state';
import { autoLoginUser } from './auth/auth-state/auth.action';
import { getErrorMessage, getLoader } from './shared-state/shared.seletor';
import { SharedSate } from './shared-state/shared.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-app';
  showLoading$!:Observable<boolean>;
  showError$!:Observable<string>;

  constructor(private store:Store<IAppState>){}

  ngOnInit(): void {
      this.showLoading$ = this.store.select(getLoader);
      this.showError$ = this.store.select(getErrorMessage);
      this.store.dispatch(autoLoginUser());
  }
}
