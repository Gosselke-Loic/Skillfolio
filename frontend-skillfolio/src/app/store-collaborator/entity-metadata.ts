import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { CollaboratorModel } from '../_helpers/interfaces';

export const ENTITY_NAME = "collaborator";

export const collaboratorSelectId = (collaborator: CollaboratorModel) => {
  return collaborator._id
}

const entityMetadata: EntityMetadataMap = {
  collaborator: {
    entityName: ENTITY_NAME,
    selectId: collaboratorSelectId
  }
};
const pluralNames = { collaborator: ENTITY_NAME };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetadata,
  pluralNames: pluralNames,
};