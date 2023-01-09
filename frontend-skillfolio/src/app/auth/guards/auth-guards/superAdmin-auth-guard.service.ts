import { Injectable, OnDestroy } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    Router, 
    RouterStateSnapshot, 
    UrlTree
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, takeUntil, Subject } from "rxjs";

import { selectUserRole } from "../../store/auth.selectors";
import { MessagesService } from "src/app/shared/messageService/message.service";

@Injectable({
    providedIn: 'root'
})
export class SuperAdminAuthGuard implements CanActivate, OnDestroy {

    role!: string;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
        private store: Store,
        private messageService: MessagesService
    ) {
        this.store.select(selectUserRole).pipe(takeUntil(this.destroy$)).subscribe(res => {if(res) this.role = res })
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.role !== "superAdmin") {
            this.messageService.clear();
            this.messageService.addMsg("No superAdmin permission");
            this.router.navigateByUrl('secured-feat')
            return false;
        }
        return true
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}