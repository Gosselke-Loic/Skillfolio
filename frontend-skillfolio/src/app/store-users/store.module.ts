import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { DefaultDataServiceConfig } from '@ngrx/data';

import { entityConfig2 } from './entity-metadata';

export const defaultDataServiceConfig2: DefaultDataServiceConfig = {
    root: 'http://localhost:3000',
    timeout: 3000,
}

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot( entityConfig2 )
    ],
    providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig2 }],
})
export class StoreDataModule2 {}