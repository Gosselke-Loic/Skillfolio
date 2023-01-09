import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { INewUser } from 'src/app/_helpers/interfaces';
import { initialValuesUser } from 'src/app/_helpers/initialValues/initialValues-collaborator';

@Component({
    selector: 'app-new-user',
    templateUrl: './newUser-dialog.component.html',
    styleUrls: ['./newUser-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {
    
    profileForm!: FormGroup;
    initialValues = initialValuesUser;

    constructor(
        public dialogRef: MatDialogRef<NewUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: INewUser,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            name: [this.data.name, [Validators.required]],
            email: [this.data.email, [Validators.email, Validators.required]],
            password: [this.data.password, [Validators.required]],
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
    };
}