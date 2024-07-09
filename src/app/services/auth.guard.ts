import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isAuthToken } from '../auth/auth-state/auth.selector';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) { }
    canActivate = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        return this.store.select(isAuthToken).pipe(
            map((token) => {
                if (!token) {
                    return this.router.createUrlTree(['auth']);
                }
                return true;
            })
        )
    }
}