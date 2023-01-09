import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MessagesService } from 'src/app/shared/messageService/message.service';
import { selectUserRole } from 'src/app/auth/store/auth.selectors';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

    readonly homeRouter = [
        { link: 'dashboard-collaborators', label: 'Collaborators' },
        { link: 'profile-collaborator', label: 'Your Profil' }
    ]

    role$: Observable<string | undefined> = this.store.select(selectUserRole)

    constructor(
        private message: MessagesService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.message.addMsg("hello");
    }
}