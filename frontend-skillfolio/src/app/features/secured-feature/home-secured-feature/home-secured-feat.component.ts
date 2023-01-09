import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, takeUntil, Subject } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { CollaboratorModel } from 'src/app/_helpers/interfaces';
import { AddCommentaryType } from 'src/app/_helpers/interfaces';

import { CollaboratorService } from 'src/app/store-collaborator/http.client.service';
import { MessagesService } from 'src/app/shared/messageService/message.service';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CommentaryDialogComponent } from '../commentary-dialog/commentary-dialog.component';

@Component({
  selector: 'app-home-secured-feat',
  templateUrl: './home-secured-feat.component.html',
  styleUrls: ['./home-secured-feat.component.scss']
})
export class HomeSecuredFeatComponent implements OnInit, OnDestroy {

    commentary!: string
    destroy$: Subject<boolean> = new Subject<boolean>();
    allUsers$!: Observable<CollaboratorModel[]>;
    search!: string;
    selectedId = "";

    constructor(
        private collaboratorService: CollaboratorService,
        private message: MessagesService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.allUsers$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.selectedId = params.get('id')!;
                return this.collaboratorService.entities$;
            })
        )
    }

    openDialog(name: string, _id: string, lastname: string): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '300px',
            data: {
                name,
                lastname,
                _id
            },
        });

        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(res => {
            if(res) {
                this.delete(res);
            }
        })
    }

    openDialog2(_id: string, name: string, lastname: string) {
        const dialogRef = this.dialog.open(CommentaryDialogComponent, {
            width: '400px',
            data: {
                name,
                lastname,
                commentary: this.commentary,
                _id
            }
        })

        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(res => {
            if(res) {
                this.sendCommentary(res);
            }
        })
    }

    delete(id: string): void {
        this.message.clear();
        try {
            this.collaboratorService.delete(id);
            this.message.addMsg("Collaborator Deleted")
        } catch (error) {
            this.message.addMsg("Error to delete, try again later")
        }
    };

    sendCommentary(data: AddCommentaryType) {
        this.message.clear();
        try {
            this.collaboratorService.update(data)
            this.message.addMsg("Added commentary")
        } catch (error) {
            this.message.addMsg("Error to update, try again later")
        }
    };

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
}
