import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, catchError, exhaustMap, finalize, map, tap } from "rxjs";

import { TokenStorageService } from "src/app/core/localStorage";
import { AuthService } from "../auth.service";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginRequest),
            exhaustMap(crendentials => 
                this.authService.login(crendentials.email, crendentials.password).pipe(
                    map(user => {
                        console.log("user", user)
                        this.tokenStorageService.saveTokens(user.token, user.token);

                        return AuthActions.loginSuccess();
                    }),
                    catchError(error => of(AuthActions.loginFailure({ error })))
                )    
            )
        );
    });
    
    onLoginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(AuthActions.loginSuccess),
          map(() => {
            this.router.navigateByUrl(
              this.activatedRoute.snapshot.queryParams["returnUrl"] || '/'
            );
            return AuthActions.getAuthUserRequest();
          })
        );
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout),
            exhaustMap(() => {
                this.router.navigateByUrl('/');
                return this.authService
                .logout()
                .pipe(finalize(() => this.tokenStorageService.removeTokens()));
            })
        )
    }, { dispatch: false });

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshTokenSuccess, AuthActions.getAuthUserRequest),
            exhaustMap(() => 
                this.authService.getAuthUser().pipe(
                    map(user => AuthActions.getAuthUserSuccess({ user })),
                    catchError(() => of(AuthActions.getAuthUserFailure()))
                )
            )
        );
    });

    refreshToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshTokenRequest),
            exhaustMap(() =>
                this.authService.refreshToken().pipe(
                map(data => {
                    this.tokenStorageService.saveTokens(data.token, data.token);
    
                    return AuthActions.refreshTokenSuccess();
                }),
                    catchError(() => of(AuthActions.refreshTokenFailure()))
                )
            )
        );
    });

    onLoginOrRefreshTokenFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(() => {
                    this.tokenStorageService.removeTokens();
                })
            )
        },
        { dispatch: false }
    );
    
    constructor(
        private router: Router,
        private actions$: Actions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private tokenStorageService: TokenStorageService
    ) {}
}