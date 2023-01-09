import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from './store-collaborator/http.client.service';
import { UserStoreService } from './store-users/http.client.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Skillfolio';

    constructor(
        private CfService: CollaboratorService,
        private userService: UserStoreService
    ) {}

    ngOnInit(): void {
        this.fetchStores();
    };

    fetchStores () {
        this.CfService.getAll();
        this.userService.getAll();
    };
}
