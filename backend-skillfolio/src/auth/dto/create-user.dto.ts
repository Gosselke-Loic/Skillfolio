import { IsNotEmpty, IsString, IsEmail, IsEnum } from "class-validator";
import { Role, Type } from "../auth.schema";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsEnum(Type)
    @IsNotEmpty()
    readonly type: string;

    @IsString()
    @IsEnum(Role)
    @IsNotEmpty()
    readonly role: string;

    @IsString()
    readonly token: string;
}