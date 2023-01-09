import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { IUserModel } from '../_helpers/interfaces';

export const ENTITY_NAME2 = "auth";

export const userSelectId = (user: IUserModel) => {
    return user.id
}

const entityMetadata2: EntityMetadataMap = {
    auth: {
        entityName: ENTITY_NAME2,
        selectId: userSelectId
    }
};
const pluralNames = { auth: "auth" };

export const entityConfig2: EntityDataModuleConfig = {
    entityMetadata: entityMetadata2,
    pluralNames,
};