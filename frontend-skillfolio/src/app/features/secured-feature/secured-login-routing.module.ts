import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SecuredLoginResolverUpdateService } from "./secured-login-resolver-update.service";
import { SuperAdminAuthGuard } from "src/app/auth/guards/auth-guards/superAdmin-auth-guard.service";

import { SuperAdminFeatComponent } from "./superAdmin-feature/super-admin-feat.component";
import { NewCollaboratorComponent } from "../update-collaborator/new-collaborator.component";
import { SecuredLoginComponent } from "./secured-login.component";
import { HomeSecuredFeatComponent } from "./home-secured-feature/home-secured-feat.component";

const securedFeatRoutes: Routes = [
    {
        path: '',
        component: SecuredLoginComponent,
        children: [
            {
                path: '',
                component: HomeSecuredFeatComponent,
            },
            {
                path: 'update/:id',
                component: NewCollaboratorComponent,
                resolve: {
                    entity: SecuredLoginResolverUpdateService
                },
            },
            {
                path: 'superadmin',
                canActivate: [SuperAdminAuthGuard],
                component: SuperAdminFeatComponent,
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(securedFeatRoutes)
    ],
    exports: [
        RouterModule
    ],
})
export class SecuredFeatRoutingModule {}