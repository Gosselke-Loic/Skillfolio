import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';

import { CreateUserDto } from 'src/auth/dto';
import { LoginUserDto } from 'src/auth/dto';
import { SignUserDto } from './dto/sign-payload.dto';
import { IUser, ISendAll, IFormatUser } from './interface/auth.interface';
import { UpdateUserDto } from 'src/auth/dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

    async signPayload(payload: SignUserDto) {
        return sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    };

    async validateUser(payload: LoginUserDto) {
        return await this.login(payload);
    };

    async createUser(createUser: CreateUserDto): Promise<IUser> {
        const { name, email, password, type, role } = createUser;

        const user = await this.userModel.findOne({ email: email });
        if(user) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newPayload = {
            name: name,
            email: email,
            password: hashPassword,
            type: type,
            role: role
        };

        const newUser = new this.userModel(newPayload);
        return newUser.save();
    }

    async login(credentials: LoginUserDto): Promise<IFormatUser | undefined> {
        const { email, password } = credentials;

        const loginUser = await this.userModel.findOne({ email: email });
        
        if(!loginUser) {
            throw new NotFoundException('Not found user or already exists')
        }
        if(await bcrypt.compare(password, loginUser.password)) {
            const { _id, name, email, role } = loginUser;
            
            const payload = {
                id: _id,
                email: email,
                role: role
            };
            const token = await this.signPayload(payload);

            await this.userModel.findByIdAndUpdate({ _id: _id }, { token: token }, { new: true })

            const formattedUser = {
                id: _id,
                name: name,
                email: email,
                role: role,
                token: token
            }
            return formattedUser as IFormatUser;
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
    }

    async logout(token: string): Promise<void> {
        const user = await this.userModel.findOne({ token: token }).exec();
        if(!user) {
            throw new NotFoundException('No logged user found');
        }
        const removeToken: UpdateUserDto = {
            token: ""
        }
        this.updateUser(user._id, removeToken)
    }

    async userAll(): Promise<ISendAll[]> {
        const NewUserArray: ISendAll[] = [];

        const users = await this.userModel.find().exec();
        if(!users || users.length === 0) {
            throw new NotFoundException('Not found users');
        }

        users.map((item: IUser) => NewUserArray.push({
            id: item._id,
            name: item.name,
            email: item.email,
            type: item.type,
            role: item.role,
        }))
        return NewUserArray as ISendAll[];
    };

    async findUserById(_id: string): Promise<IUser> {
        const user = await this.userModel.findOne({ _id: _id }).exec();
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    
    async currentUser(headers: string): Promise<IFormatUser | undefined> {
        const user = await this.userModel.findOne({ token: headers }).exec();
        if(!user) {
            throw new NotFoundException('Not found logged user');
        };
        const formattedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: user.token,
        }
        return formattedUser as IFormatUser;
    };

    async deleteUser(userId: string): Promise<IUser> {
        const deleteUser = await this.userModel.findByIdAndDelete({ _id: userId });
        if(!deleteUser) {
            throw new NotFoundException(`User #${ userId } not found`);
        };
        return deleteUser;
    }

    async updateUser (userId: string, updateUser: UpdateUserDto): Promise<ISendAll> {
        const pathUser = await this.userModel.findByIdAndUpdate({ _id: userId }, updateUser, { new: true });

        if(!pathUser) {
            throw new NotFoundException(`User #${ userId } not found`);
        }
        const formattedUser = {
            id : pathUser._id,
            name: pathUser.name,
            email: pathUser.email,
            role: pathUser.role,
            type: pathUser.type
        }

        return formattedUser;
    }
}
 
/* {
    superAdmin
    "name": "Geralt",
    "email": "fate@gmail.com",
    "password": "holamundo1234"

    user
    "name": "MrNoBody",
    "email": "collaborator@gmail.com",
    "password": "angular1234",

    enterprise
    "name": "Google",
    "email": "Google@gmail.com",
    "password": "MoneyisMoney",

    JobCoachs
    "name": "Vergil",
    "email": "DevilMayCry@gmail.com",
    "password": "Sparda1234",

    "name": "Sauron",
    "email": "DestinyMountain@gmail.com",
    "password": "WhereIsMyRing",

    CoachCordinator
    "name": "Romina",
    "email": "Dracul12@gmail.com",
    "password": "JustStayHere12",

    Teacher
    "name": "John",
    "email": "9mmBerreta@gmail.com",
    "password": "AllForMyDog",

    "name": "Snake",
    "email": "MetalGearSolid@gmail.com",
    "password": "ImTooOldForThisShit",
} */