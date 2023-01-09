import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { CollaboratorModel } from "../_helpers/interfaces";
import { ENTITY_NAME } from "./entity-metadata";

@Injectable({ providedIn: 'root' })
export class CollaboratorService extends EntityCollectionServiceBase<CollaboratorModel> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super(ENTITY_NAME, serviceElementsFactory);
    }
}