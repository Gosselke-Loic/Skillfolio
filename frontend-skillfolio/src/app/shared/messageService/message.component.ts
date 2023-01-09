import { Component } from '@angular/core';
import { MessagesService } from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {

    constructor(public messageService: MessagesService) {}
}