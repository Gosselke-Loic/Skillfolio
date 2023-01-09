import { Component, OnInit } from '@angular/core';

import { AuthFacade } from 'src/app/auth/store/auth.facade';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    readonly menuItems = [
        { link: '/home', label: 'Home' },
        { link: '/secured-feat', label: 'Secured Feature' }
    ]

    authUser$ = this.authFacade.user$;
    
    ngOnInit(): void {}

    logout() {
        this.authFacade.logout();
    };
    
    constructor(private authFacade: AuthFacade) {}
};