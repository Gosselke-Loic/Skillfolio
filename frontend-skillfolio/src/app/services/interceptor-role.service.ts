import { Injectable, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

import { UserStoreService } from "../store-users/http.client.service";
import { IUserModel } from "../_helpers/interfaces";

@Injectable({
    providedIn: 'root'
})
export class InterceptorRoleService implements OnDestroy {
    users!: IUserModel[];
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private userStore: UserStoreService
    ) {
        this.userStore.entities$.pipe(takeUntil(this.destroy$)).subscribe(res => { if(res) this.users = res});
    }

    getRole(email: string, url: string): boolean {
        let auth: boolean = false
        const user = this.users.find(item => item.email === email);

        if(!user) {
            return auth;
        };

        if(!url.includes("secured-feat")) {
            return auth = true;
        };

        if(user.role === "admin" || user.role === "superAdmin") {
            return auth = true;
        };

        return auth;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}