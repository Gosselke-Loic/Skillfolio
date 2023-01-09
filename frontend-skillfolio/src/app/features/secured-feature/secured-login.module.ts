import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LetModule } from "@ngrx/component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { FilterPipe } from "src/app/_helpers/pipes/filter.pipe";

import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { DeleteUserDialogComponent } from "./superAdmin-feature/delete-user/deleteUser-dialog.component";
import { CommentaryDialogComponent } from "./commentary-dialog/commentary-dialog.component";
import { UpdateUserDialogComponent } from "./superAdmin-feature/update-user/updateUser-dialog.component";
import { NewUserDialogComponent } from "./superAdmin-feature/new-user/newUser-dialog.component";

import { SuperAdminFeatComponent } from "./superAdmin-feature/super-admin-feat.component";
import { NewCollaboratorComponent } from "../update-collaborator/new-collaborator.component";
import { SecuredFeatRoutingModule } from "./secured-login-routing.module";
import { HomeSecuredFeatComponent } from "./home-secured-feature/home-secured-feat.component";
import { SecuredLoginComponent } from "./secured-login.component";

@NgModule({
    imports: [
        CommonModule,
        LetModule,
        FormsModule,
        ReactiveFormsModule,
        SecuredFeatRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatDividerModule,
        MatSelectModule
    ],
    declarations: [
        SecuredLoginComponent, 
        SuperAdminFeatComponent,
        NewCollaboratorComponent,
        HomeSecuredFeatComponent,

        CommentaryDialogComponent,
        DeleteDialogComponent,
        DeleteUserDialogComponent,
        UpdateUserDialogComponent,
        NewUserDialogComponent,
        FilterPipe,
    ],
})
export class SecureLoginModule {}