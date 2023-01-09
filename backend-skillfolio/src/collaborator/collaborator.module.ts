import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CollaboratorSchema } from './collaborateur.schema';
import { CollaboratorController } from './collaborateur.controller';
import { CollaboratorService } from './collaborateur.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Collaborator', schema: CollaboratorSchema }])],
    controllers: [CollaboratorController],
    providers: [CollaboratorService],
    exports: [CollaboratorService]
})
export class CollaboratorModule {}
