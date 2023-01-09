import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AuthService, authServiceInitProvider } from "./auth.service";
import { NoAuthGuardService } from "./guards";
import { LoginComponent } from "./login/login.component";
import { AuthEffects } from "./store/auth.effects";
import { AuthFacade } from "./store/auth.facade";
import { AUTH_FEATURE_KEY, authReducer } from "./store/auth.reducers";

import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuardService],
    },
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
    declarations: [LoginComponent],
    providers: [AuthFacade, AuthService, authServiceInitProvider]
})
export class AuthModule {}