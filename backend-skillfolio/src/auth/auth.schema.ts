import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    SUPERADMIN = 'superAdmin',
    ADMIN = 'admin',
    USER = 'user',
    ENTERPRISE = 'enterprise'
}

export enum Type {
    ADMIM = 'admin',
    JOBCOACH = 'jobCoach',
    TEACHER = 'teacher',
    COACHCORDINATOR = 'coachCordinator',
    COLLABORATOR = 'collaborator',
    ENTERPRISE = 'enterprise'
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name!: string;
    @Prop({ required: true, unique: true })
    email!: string;
    @Prop({ required: true })
    password!: string;
    @Prop({ required: true, enum: Type })
    type!: Type;
    @Prop({ required: true, enum: Role })
    role!: Role;
    @Prop({ default: "" })
    token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);