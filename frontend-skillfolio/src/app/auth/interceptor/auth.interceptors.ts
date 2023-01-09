import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, throwError, catchError } from "rxjs";

import { TokenStorageService } from "src/app/core/localStorage";
import { AuthFacade } from "../store/auth.facade";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authFacade: AuthFacade,
        private tokenStorageService: TokenStorageService
    ) {}

    intercept(
        req: HttpRequest<unknown>, 
        next: HttpHandler
        ): Observable<HttpEvent<unknown>> {
        
        console.log(req.urlWithParams)
        const token = this.tokenStorageService.getAccessToken();
        
        if(token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
        };

        return next.handle(req).pipe(s => this.handleErrors(s, req.url));
    };

    private handleErrors(
        source: Observable<HttpEvent<unknown>>,
        urlPath: string
    ): Observable<HttpEvent<unknown>> {
        return source.pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401 && !urlPath.includes('/auth/')) {
                    return this.handle401();
                };
                return throwError(() => error);
            })
        )
    };

    private handle401() {
        this.authFacade.logout();
        return EMPTY;
    }
}