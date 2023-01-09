import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { IUserModel } from "../_helpers/interfaces";
import { ENTITY_NAME2 } from "./entity-metadata";

@Injectable({ providedIn: 'root' })
export class UserStoreService extends EntityCollectionServiceBase<IUserModel> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super(ENTITY_NAME2, serviceElementsFactory);
    }
}