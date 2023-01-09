import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home.component";
import { HomeViewComponent } from "./home-view/home-view.component";
import { DashboardCollaboratorsComponent } from "../dashboard-collaborators/dashboard-collaborators.component";
import { ProfileCollaboratorComponent } from "../profile-collaborator/profile-collaborator.component";
import { NewCollaboratorComponent } from "../update-collaborator/new-collaborator.component";

import { ProfileCollaboratorResolverService } from "./profile-collaborator-resolver.service";
import { SecuredLoginResolverUpdateService } from "../secured-feature/secured-login-resolver-update.service";

const Homeroutes: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        children: [
            {
                path: '',
                component: HomeViewComponent,
            },
            {
                path: 'dashboard-collaborators',
                component: DashboardCollaboratorsComponent,
            }, 
            {
                path: 'profile-collaborator',
                component: ProfileCollaboratorComponent,
                resolve: {
                    entity: ProfileCollaboratorResolverService
                },
                children: [
                    {
                        path: 'update/:id',
                        component: NewCollaboratorComponent,
                        resolve: {
                            entity: SecuredLoginResolverUpdateService
                        },
                    }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(Homeroutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {}