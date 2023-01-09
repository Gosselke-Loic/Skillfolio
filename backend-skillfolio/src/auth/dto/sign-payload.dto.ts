import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class SignUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;
}