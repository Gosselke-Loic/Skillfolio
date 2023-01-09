export enum Type {
    ADMIM = 'admin',
    JOBCOACH = 'jobCoach',
    TEACHER = 'teacher',
    COACHCORDINATOR = 'coachCordinator',
    COLLABORATOR = 'collaborator',
    ENTERPRISE = 'enterprise'
}

export interface INewUser {
    name: string;
    email: string;
    password: string;
    type: string;
    role: string;
}

export interface IUserModel {
    id: string;
    name: string;
    email: string;
    type: string;
    role: string;
}
export type DeleteUserType = Pick<IUserModel, "email" | "id">;

export interface UpdateUser {
    id: string;
    name: string;
    email: string;
    password: string;
    type: string;
    role: string;
}