import { Document } from "mongoose";

export class ICollaborator extends Document {
    readonly _id: string;
    readonly file: string;
    readonly email: string;
    readonly name: string;
    readonly lastname: string;
    readonly age: number;
    readonly year: number;
    readonly departament: string;
    readonly language: string;
    readonly research: boolean;
    readonly jobCoach: string;
    readonly coachCordinator: string;
    readonly teacher: string;
    readonly commentary: string;
}