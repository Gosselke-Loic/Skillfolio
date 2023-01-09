import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { tap, Subject, takeUntil } from 'rxjs';

import { MessagesService } from 'src/app/shared/messageService/message.service';

import { UpdateCollaboratorModel } from 'src/app/_helpers/interfaces';

@Component({
    selector: 'app-profile-collaborator',
    templateUrl: './profile-collaborator.component.html',
    styleUrls: ['./profile-collaborator.component.scss']
})
export class ProfileCollaboratorComponent implements OnInit, OnDestroy {

    dataFromParams!: UpdateCollaboratorModel | Data;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private message: MessagesService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.data.pipe(
            tap((data: UpdateCollaboratorModel | Data) =>
                this.dataFromParams = data
            ),
            takeUntil(this.destroy$)
        ).subscribe();

        console.log(this.dataFromParams)
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
