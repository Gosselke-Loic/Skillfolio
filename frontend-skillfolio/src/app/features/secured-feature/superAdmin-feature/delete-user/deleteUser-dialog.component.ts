import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DeleteUserType } from 'src/app/_helpers/interfaces';

@Component({
    selector: 'app-delete-user',
    templateUrl: './deleteUser-dialog.component.html',
    styleUrls: ['./deleteUser-dialog.component.scss']
})
export class DeleteUserDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteUserType,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}