import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { isAuthToken } from '../auth/auth-state/auth.selector';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(isAuthToken).pipe(
            take(1),
            exhaustMap((token) => {

                if (!token) {
                    return next.handle(req);
                }
                let modifiiedReq = req.clone({
                    params: req.params.append("auth", token)
                });
                return next.handle(modifiiedReq);
            })
        );
    }
}