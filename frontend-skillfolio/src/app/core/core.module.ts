import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";

import { AuthModule } from "../auth/auth.module";
import { authInterceptorProvider } from "../auth/interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
       
        StoreModule.forRoot({}, {}),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([]),

        AuthModule,
    ],
    providers: [
        ...authInterceptorProvider
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error ('CoreModule is already loaded. Import only once in AppModule');
        }
    }
}