import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MessageComponent } from "./message.component";
import { MessagesService } from "./message.service";

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
    declarations: [
        MessageComponent,
    ],
    providers: [
        MessagesService,
    ],
    exports: [
        MessageComponent,
    ]
})
export class MessageModule {}