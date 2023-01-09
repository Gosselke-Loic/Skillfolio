import { Injectable, OnDestroy } from "@angular/core";
import {
    Router, 
    Resolve, 
    RouterStateSnapshot, 
    ActivatedRouteSnapshot 
} from "@angular/router";
import { Observable, of, EMPTY, Subject, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";

import { CollaboratorService } from "src/app/store-collaborator/http.client.service";
import { MessagesService } from "src/app/shared/messageService/message.service";

import { CollaboratorModel } from "src/app/_helpers/interfaces";
import { AuthUser } from "src/app/auth/store/auth.models";

import { selectAuthUser } from "src/app/auth/store/auth.selectors";

@Injectable({
    providedIn: 'root'
})
export class ProfileCollaboratorResolverService implements Resolve<CollaboratorModel>, OnDestroy {

    currentUser!: AuthUser;
    entities$: Observable<CollaboratorModel[]>;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private collaboratorService: CollaboratorService,
        private router: Router,
        private message: MessagesService,
        private store: Store
    ) {
        this.entities$ = this.collaboratorService.entities$;
        this.store.select(selectAuthUser).pipe(takeUntil(this.destroy$)).subscribe(res => {if(res) this.currentUser = res})
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CollaboratorModel | Observable<CollaboratorModel> | Promise<CollaboratorModel> {
        const emailUser = this.currentUser.email;
        let entity: CollaboratorModel | undefined;
        
        this.entities$.pipe(takeUntil(this.destroy$)).subscribe((res) =>
            entity = res.find(item => item.email === emailUser)
        );

        if(!entity) {
            this.message.addMsg("Error to redirect, try again later")
            this.router.navigate(['/']);
            return EMPTY;
        }

        return of(entity);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}