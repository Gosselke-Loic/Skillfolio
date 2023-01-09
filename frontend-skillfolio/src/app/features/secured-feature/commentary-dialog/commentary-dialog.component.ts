import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCommentaryType } from 'src/app/_helpers/interfaces';

@Component({
    selector: 'app-commentary-dialog',
    templateUrl: './commentary-dialog.component.html',
    styleUrls: ['./commentary-dialog.component.scss']
})
export class CommentaryDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AddCommentaryType>,
        @Inject(MAT_DIALOG_DATA) public data: AddCommentaryType,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}