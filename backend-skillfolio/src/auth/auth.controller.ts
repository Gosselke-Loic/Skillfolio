import { Controller, Body, Delete, Get, HttpStatus, Param, Post, Put, Res, Headers, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

import { ValidateId } from 'src/shared/validate-object-id.pipes';

import { AuthService } from './auth.service';
import { CollaboratorService } from 'src/collaborator/collaborateur.service';

import { LoginUserDto, UpdateUserDto, CreateUserDto } from 'src/auth/dto';

import { JobCoach, CoachCordinator, Teacher } from 'src/collaborator/collaborateur.schema'; 

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private collaboratorService: CollaboratorService
    ) {}

    @Post()
    async postUser(
        @Res() res: Response, 
        @Body() bodyUser: CreateUserDto
    ) {
        try {
            
            if(bodyUser.type === "collaborator") {
                const newUser = await this.authService.createUser(bodyUser);
                const {_id, name, email, type, role} = newUser;

                const newCollaborator = {
                    file: "",
                    email: email,
                    name: name,
                    lastname: "",
                    age: 18,
                    year: 1986,
                    departament: "",
                    language: "",
                    research: true,
                    jobCoach: JobCoach.FIRST,
                    coachCordinator: CoachCordinator.FIRST,
                    teacher: Teacher.FIRST,
                    commentary: "",
                }
                await this.collaboratorService.create(newCollaborator);

                return res.status(HttpStatus.CREATED).json({
                    id: _id,
                    name,
                    email,
                    type,
                    role,
                })

            } 
            
            if(bodyUser.type !== "collaborator") {

                const newUser = await this.authService.createUser(bodyUser);
                const {_id, name, email, type, role} = newUser;

                return res.status(HttpStatus.CREATED).json({
                    id: _id,
                    name,
                    email,
                    type,
                    role,
                })
            }
                
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created',
                error: error.message,
            });
        }
    };

    @Post("login")
    async loginController(
        @Body() loginDTO: LoginUserDto, 
        @Res() res: Response
    ) {
        try {
            const user = await this.authService.login(loginDTO);
            return res.status(HttpStatus.OK).json(
                user
            )
        } catch (error) {
            return res.status(error.status).json(error.response);
        };
    }

    @Get('logout')
    async logout(
        @Headers('Authorization') headers: string, 
        @Res() res: Response
    ) { 
        
        let bearer: string = '';

        if(typeof headers !== 'undefined') {
            bearer = headers.replace('Bearer ','');
        }
        if(bearer === '') {
            throw new UnauthorizedException('No token provided')
        }

        try {
            await this.authService.logout(bearer);
            return res.status(HttpStatus.OK).json({
                message: "Logout Successfully"
            })
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    }

    @Get()
    async getUsers(@Res() res: Response) {
        try {
            const usersData = await this.authService.userAll();
            return res.status(HttpStatus.OK).json(
                usersData
            )
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    };

    @Get('current')
    async getUser(
        @Res() res: Response,
        @Headers('Authorization') headers: string
    ) {
        let bearer: string = '';

        if(typeof headers !== 'undefined') {
            bearer = headers.replace('Bearer ','');
        }
        if(bearer === '') {
            throw new UnauthorizedException('No token provided')
        }

        try {
            const user = await this.authService.currentUser(bearer);
            return res.status(HttpStatus.OK).json(
                user
            )
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    };

    @Put(':id')
    async pathUser(
        @Res() res: Response,
        @Param('id', new ValidateId()) userId: string,
        @Body() bodyUser: UpdateUserDto
    ) {
        const {email} = bodyUser;
        try {
            const user = await this.authService.findUserById(userId);

            if(user.email !== email) {
                const collaborator = await this.collaboratorService.findByEmail(user.email);

                const changesCollaborator = {
                    email: email
                }
                await this.collaboratorService.update(collaborator._id, changesCollaborator);

                const userNewData = await this.authService.updateUser(userId, bodyUser);
                return res.status(HttpStatus.OK).json({
                    userNewData
                })
            }

            if(user.email === email) {
                const userData = await this.authService.updateUser(userId, bodyUser);
                console.log(userData)
                return res.status(HttpStatus.OK).json({
                    userData
                })
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created',
                error: error.message,
            });
        }
    };

    @Delete(':id')
    async removeUser(@Res() res: Response, @Param('id', new ValidateId()) userId: string) {
        try {
            const user = await this.authService.findUserById(userId);

            if(user.type === "collaborator") {
                const collaborator = await this.collaboratorService.findByEmail(user.email);

                await this.collaboratorService.remove(collaborator._id);
            };

            const removeUser = await this.authService.deleteUser(userId);
            return res.status(HttpStatus.OK).json({
                message: 'User deleted',
                removeUser,
            });
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    }
}