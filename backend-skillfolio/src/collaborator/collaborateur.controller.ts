import { Controller, Get, Body, Put, Param, Delete, Res, HttpStatus} from '@nestjs/common';
import { Response } from 'express';

import { CollaboratorService } from './collaborateur.service';
import { UpdateCollaboratorDto } from './dto';
import { ValidateId } from 'src/shared/validate-object-id.pipes';

@Controller('collaborator')
export class CollaboratorController {
    constructor(private readonly collaboratorService: CollaboratorService) {}

    @Get()
    async getCollaborators(@Res() res: Response) {
        try {
            const collaboratorData = await this.collaboratorService.findAll();
            return res.status(HttpStatus.OK).json(
                collaboratorData
            )
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    };

    @Get(':id')
    async getCollaborator(
        @Res() res: Response,
        @Param('id', new ValidateId()) collaboratorId: string,
    ) {
        try {
            const collaboratorData = await this.collaboratorService.findOne(collaboratorId);
            return res.status(HttpStatus.OK).json({
                collaboratorData
            });
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    };

    @Put(':id')
    async pathCollaborator(
        @Res() res: Response,
        @Param('id', new ValidateId()) collaboratorId: string,
        @Body() bodyCollaborator: UpdateCollaboratorDto,
    ) {
        try {
            const collaboratorData = await this.collaboratorService.update(collaboratorId, bodyCollaborator);
            return res.status(HttpStatus.OK).json({
                collaboratorData,
            })
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    };

    @Delete(':id')
    async removeCollaborator(
        @Res() res: Response,
        @Param('id', new ValidateId()) collaboratorId: string
    ) {
        try {
            const removeCollaborator = await this.collaboratorService.remove(collaboratorId);
            return res.status(HttpStatus.OK).json({
                removeCollaborator,
            })
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    }
}
