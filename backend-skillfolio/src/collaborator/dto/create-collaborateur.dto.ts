import { IsNotEmpty, IsString, Length, IsNumber, IsUrl, IsOptional, IsBoolean, Min, Max, IsEnum, IsEmail} from "class-validator";
import { JobCoach, CoachCordinator, Teacher } from "../collaborateur.schema";

export class CreateCollaboratorDto {
    @IsUrl()
    @IsOptional()
    readonly file: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 25)
    readonly name: string;

    @IsString()
    @Length(2, 25)
    readonly lastname: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(18)
    @Max(99)
    readonly age: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1986)
    @Max(2022)
    readonly year: number;

    @IsString()
    readonly departament: string;

    @IsString()
    readonly language: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly research: boolean;

    @IsString()
    @IsEnum(JobCoach)
    @IsNotEmpty()
    readonly jobCoach: string;

    @IsString()
    @IsEnum(CoachCordinator)
    @IsNotEmpty()
    readonly coachCordinator: string;

    @IsString()
    @IsEnum(Teacher)
    @IsNotEmpty()
    readonly teacher: string;

    @IsString()
    @IsOptional()
    @Length(0, 256)
    readonly commentary: string
}