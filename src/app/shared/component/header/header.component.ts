import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutUser } from 'src/app/auth/auth-state/auth.action';
import { isAuthenticated } from 'src/app/auth/auth-state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logoutUser());
  }
}
