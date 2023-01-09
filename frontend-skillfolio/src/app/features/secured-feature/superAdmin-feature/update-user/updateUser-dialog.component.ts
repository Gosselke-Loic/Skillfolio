import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UpdateUser } from 'src/app/_helpers/interfaces';
import { initialValuesUser } from 'src/app/_helpers/initialValues/initialValues-collaborator';

@Component({
    selector: 'app-update-user',
    templateUrl: './updateUser-dialog.component.html',
    styleUrls: ['./updateUser-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {
    
    profileForm!: FormGroup;
    initialValues = initialValuesUser;

    constructor(
        public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateUser,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            id: [this.data.id],
            name: [this.data.name, [Validators.required]],
            email: [this.data.email, [Validators.email]],
            password: [this.data.password],
            type: [this.data.type, [Validators.required]],
            role: [this.data.role, [Validators.required]]
        })
    };

    get name() { return this.profileForm.get('name'); };
    get email() { return this.profileForm.get('email'); };
    get password() { return this.profileForm.get('password'); };
    get type() { return this.profileForm.get('type'); };
    get role() { return this.profileForm.get('role'); };

    onNoClick(): void {
        this.dialogRef.close();
    }
}