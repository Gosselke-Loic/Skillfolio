import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { DefaultDataServiceConfig } from '@ngrx/data';

import { entityConfig } from './entity-metadata';

export const defaulDataServiceConfig: DefaultDataServiceConfig = {
    root: 'http://localhost:3000',
    timeout: 3000,
}

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot( entityConfig )
    ],
    providers: [{ provide: DefaultDataServiceConfig, useValue: defaulDataServiceConfig }],
})
export class StoreDataModule {}