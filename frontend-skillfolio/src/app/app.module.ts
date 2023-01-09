import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreDataModule } from './store-collaborator/store.module';
import { StoreDataModule2 } from './store-users/store.module';

import { CoreModule } from './core/core.module';

import { HeaderModule } from './shared/header/header.module';
import { MessageModule } from './shared/messageService/message.module';
import { SecureLoginModule } from './features/secured-feature/secured-login.module';
import { HomeModule } from './features/home/home.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        
        CoreModule,
        StoreDataModule,
        StoreDataModule2,

        HeaderModule,
        MessageModule,
        AppRoutingModule,
        HomeModule,
        SecureLoginModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
