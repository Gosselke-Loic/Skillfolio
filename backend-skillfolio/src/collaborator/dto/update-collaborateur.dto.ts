import { PartialType } from '@nestjs/mapped-types';
import { CreateCollaboratorDto } from './create-collaborateur.dto';

export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {}