import { HttpClient } from "@angular/common/http";
import { APP_INITIALIZER, Injectable, Provider } from "@angular/core";
import { Store } from "@ngrx/store";
import { lastValueFrom, Observable, filter, take, throwError} from "rxjs";

import { TokenStorageService, ConfigService } from "src/app/core/localStorage";
import { AuthState, TokenStatus, AuthUser } from "./store/auth.models";
import * as AuthActions from "./store/auth.actions";
import * as AuthSelectors from "./store/auth.selectors";

export interface AccessData {
    access_token: string;
    refresh_token: string;
}

@Injectable()
export class AuthService {
    private hostUrl: string;

    constructor(
        private store: Store,
        private http: HttpClient,
        private configService: ConfigService,
        private tokenStorageService: TokenStorageService,
    ) {this.hostUrl = this.configService.getAPiUrl()}

    init(): Promise<AuthState> {
        this.store.dispatch(AuthActions.refreshTokenRequest());

        const authState$ = this.store.select(AuthSelectors.selectAuth).pipe(
            filter(
                auth =>
                    auth.refreshTokenStatus === TokenStatus.INVALID ||
                    (auth.refreshTokenStatus === TokenStatus.VALID && !!auth.user)
            ),
            take(1)
        );
        return lastValueFrom(authState$);
    };

    login(email: string, password: string): Observable<AuthUser> {
        return this.http.post<AuthUser>(`${this.hostUrl}/auth/login`, {
            email,
            password
        })
    };

    logout(): Observable<void> {
        return this.http.get<void>(`${this.hostUrl}/auth/logout`);
    };

    refreshToken(): Observable<AuthUser> {
        const refreshToken = this.tokenStorageService.getRefreshToken();
         if (!refreshToken) {
            return throwError(() => new Error('Refresh token does not exist'));
        }
    
        return this.http.get<AuthUser>(`${this.hostUrl}/auth/current`);
    }

    getAuthUser(): Observable<AuthUser> {
        return this.http.get<AuthUser>(`${this.hostUrl}/auth/current`)
    };
}

export const authServiceInitProvider: Provider = {
    provide: APP_INITIALIZER,
    useFactory: (authService: AuthService) => () => authService.init(),
    deps: [AuthService],
    multi: true,
};