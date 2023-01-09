import { Injectable, OnDestroy } from "@angular/core";
import {
    Router, 
    Resolve, 
    RouterStateSnapshot, 
    ActivatedRouteSnapshot 
} from "@angular/router";
import { Observable, of, EMPTY, Subject, takeUntil } from "rxjs";

import { CollaboratorService } from "src/app/store-collaborator/http.client.service";
import { MessagesService } from "src/app/shared/messageService/message.service";

import { CollaboratorModel } from "src/app/_helpers/interfaces";

@Injectable({
    providedIn: 'root'
})
export class SecuredLoginResolverUpdateService implements Resolve<CollaboratorModel>, OnDestroy {
    entities$: Observable<CollaboratorModel[]>;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private collaboratorService: CollaboratorService,
        private router: Router,
        private message: MessagesService
    ) {
        this.entities$ = this.collaboratorService.entities$;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CollaboratorModel | Observable<CollaboratorModel> | Promise<CollaboratorModel> {
        const id = route.paramMap.get('id');

        let entity: CollaboratorModel | undefined;
        this.entities$.pipe(takeUntil(this.destroy$)).subscribe((res) =>
            entity = res.find(item => item._id === id)
        );
        
        if(!entity) {
            this.message.addMsg("Error to redirect, try again later")
            this.router.navigate(['/secured-feat']);
            return EMPTY;
        };
        
        return of(entity);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}