import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { HomeViewComponent } from "./home-view/home-view.component";
import { DashboardCollaboratorsComponent } from "../dashboard-collaborators/dashboard-collaborators.component";
import { ProfileCollaboratorComponent } from "../profile-collaborator/profile-collaborator.component";

import { HomeRoutingModule } from "./home.router.module";

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDividerModule
    ],
    declarations: [
        HomeComponent,
        HomeViewComponent,
        DashboardCollaboratorsComponent,
        ProfileCollaboratorComponent
    ],
})
export class HomeModule {}