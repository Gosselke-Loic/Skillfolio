import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum JobCoach {
   FIRST = 'Vergil',
   SECOND = 'Sauron'
}

export enum CoachCordinator {
   FIRST = 'Romina',
   SECOND = 'Saruman'
}

export enum Teacher {
   FIRST = 'Snake',
   SECOND = 'John'
}

@Schema({ timestamps: true })
export class Collaborator {
   @Prop({ required: false, default: "" })
   file: string;
   @Prop({ required: true })
   email: string;
   @Prop({ required: true })
   name: string;
   @Prop()
   lastname: string;
   @Prop({ min: 18, max: 99, required: true })
   age: number;
   @Prop({ min: 1986, max: 2022, required: true })
   year: number;
   @Prop()
   departament: string;
   @Prop()
   language: string;
   @Prop({ required: true })
   research: boolean;
   @Prop({ enum: JobCoach, required: true })
   jobCoach: JobCoach;
   @Prop({ enum: CoachCordinator, required: true})
   coachCordinator: CoachCordinator;
   @Prop({ enum: Teacher, required: true })
   teacher: Teacher;
   @Prop ({ required: false, default: "" })
   commentary: string;
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);