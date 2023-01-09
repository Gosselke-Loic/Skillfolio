import { Injectable, OnDestroy } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate,
    Router, 
    RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, take, tap, takeUntil, Subject, of } from "rxjs";

import { selectIsLoggedIn } from "../../store/auth.selectors";
import { selectUserRole } from "../../store/auth.selectors";

import { MessagesService } from "src/app/shared/messageService/message.service";

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, OnDestroy {
    
    role!: string | undefined;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router, 
        private store: Store,
        private message: MessagesService
    ) {
        this.store.select(selectUserRole).pipe(takeUntil(this.destroy$)).subscribe(res => this.role = res);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        if(!this.role) {
            return this.store.select(selectIsLoggedIn).pipe(
                take(1),
                tap(isLoggedIn => {
                    if (!isLoggedIn) {
                        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    }
                })
            );
        } 

        if(this.role === "admin" || this.role === "superAdmin") {
            return of(true)
        };
        
        this.message.clear()
        this.message.addMsg("No permissions with this account")
        return of(false)
    };

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}