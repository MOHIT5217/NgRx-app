import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLoginUser, loginStart, loginSuccess, logoutUser, signupStart, signupSuccess } from "./auth.action";
import { catchError, exhaustMap, map, mergeMap, retry, tap } from 'rxjs/operators'
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { getErrorMessage, loader } from "src/app/shared-state/shared.action";
import { EMPTY, of } from "rxjs";
import { Router } from "@angular/router";


@Injectable()

export class AuthEffact {
    constructor(private action$: Actions, private authservice: AuthService, private store: Store, private router: Router) { }

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authservice.login(action.email, action.password)
                    .pipe(map(data => {
                        this.store.dispatch(loader({ status: false }));
                        this.store.dispatch(getErrorMessage({ errorMessage: '' }));
                        const user = this.authservice.formatUser(data);
                        this.authservice.setUserLocalstorage(user);
                        return loginSuccess({ user, redirect:true });
                    }),
                        catchError(err => {
                            this.store.dispatch(loader({ status: false }));
                            const errrorKey = err.error.error.message;
                            const error = this.authservice.errorMessage(errrorKey);
                            return of(getErrorMessage({ errorMessage: error }))
                        })
                    );
            })
        )
    });

    signup$ = createEffect(() => {
        console.log("createEffect");

        return this.action$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                console.log(action, "Action");

                return this.authservice.signUp(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(loader({ status: false }));
                        this.store.dispatch(getErrorMessage({ errorMessage: '' }));
                        const user = this.authservice.formatUser(data);
                        this.authservice.setUserLocalstorage(user);
                        return signupSuccess({ user, redirect:true });
                    }),
                    catchError(err => {
                        this.store.dispatch(loader({ status: false }));
                        const errrorKey = err.error.error.message;
                        const error = this.authservice.errorMessage(errrorKey);
                        return of(getErrorMessage({ errorMessage: error }))
                    })
                )
            })
        )
    });
    redirectToHome$ = createEffect(() => {
        return this.action$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap((action) => {
                if(action.redirect){
                    this.router.navigate(['/']);
                }
            })
        )
    },
        {
            dispatch: false
        });

    autoLogin$ = createEffect(() => {
        return this.action$.pipe(
            ofType(autoLoginUser),
            mergeMap((action) => {
                const user = this.authservice.getUserLocalstorage();
                if (user) {
                    return of(loginSuccess({ user , redirect:false}));
                } else {
                    // Handle the case where the user is not found in local storage
                    // You can dispatch a different action or perform some other logic here
                    return EMPTY; // or return of(anotherAction());
                }
            })
        )
    });

    logOut$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(logoutUser),
            map(()=>{
                this.authservice.onLogout();
                this.router.navigate(['auth']);
            })
        )
    },
    {
        dispatch: false
    })
}


