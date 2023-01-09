import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/guards';
import { DashboardCollaboratorsComponent } from './features/dashboard-collaborators/dashboard-collaborators.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
        data: { preload: true },
    },
    {
        path: 'secured-feat',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./features/secured-feature/secured-login.module').then(m => m.SecureLoginModule),
        data: { preload: true },
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: "enabled",
        preloadingStrategy: PreloadAllModules,
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
