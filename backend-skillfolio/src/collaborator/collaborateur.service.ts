import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

import { ICollaborator } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto';
import { UpdateCollaboratorDto } from './dto';

@Injectable()
export class CollaboratorService {
    constructor(
        @InjectModel('Collaborator') private readonly collaboratorModel: Model<ICollaborator>
    ) {}

    async create(createCollaboratorDto: CreateCollaboratorDto): Promise<ICollaborator> {
        const { email } = createCollaboratorDto;
        
        const collaborator = await this.collaboratorModel.findOne({ email: email });
        if(collaborator) {
            throw new HttpException('collaborator already exists', HttpStatus.BAD_REQUEST);
        }

        const newCollaborator = new this.collaboratorModel(createCollaboratorDto);
        return newCollaborator.save();
    };

    async findAll(): Promise<ICollaborator[]> {

        const collaborators = await this.collaboratorModel.find().exec();
        if(!collaborators || collaborators.length === 0) {
            throw new NotFoundException('Not found collaborators');
        }

        return collaborators;
    };

    async findByEmail(userEmail: string): Promise<ICollaborator> {
        const collaborator = await this.collaboratorModel.findOne({ email: userEmail }).exec();
        
        if(!collaborator) {
            throw new NotFoundException(`Collaborator with this email ${ userEmail }, not found`);
        };
        return collaborator;
    }

    async findOne(collaboratorId: string): Promise<ICollaborator> {
        const collaborator = await this.collaboratorModel.findById({ _id: collaboratorId }).exec();
        if(!collaborator) {
            throw new NotFoundException(`Collaborator #${ collaboratorId } not found`);
        };
        return collaborator;
    }

    async update(collaboratorId: string, updateCollaboratorDto: UpdateCollaboratorDto): Promise<ICollaborator> {
        const pathCollaborator = await this.collaboratorModel.findByIdAndUpdate({ _id: collaboratorId }, updateCollaboratorDto, { new: true });
        if(!pathCollaborator) {
            throw new NotFoundException(`Collaborator #${ collaboratorId } not found`);
        }
        return pathCollaborator;
    }

    async remove(collaboratorId: string): Promise<ICollaborator> {
        const deleteCollaborator = await this.collaboratorModel.findByIdAndDelete({ _id: collaboratorId });
        if(!deleteCollaborator) {
            throw new NotFoundException(`Collaborator #${ collaboratorId } not found`);
        }
        return deleteCollaborator;
    }
};