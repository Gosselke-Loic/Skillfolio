export interface CollaboratorModel {
    _id: string;
    file?: string;
    email?: string;
    name: string;
    lastname: string;
    age: number;
    year: number;
    departament: string;
    language: string;
    research: boolean;
    jobCoach: string;
    coachCordinator: string;
    teacher: string;
    commentary?: string;
};

export type TableModelCollaborator = Omit<CollaboratorModel, "jobCoach" | "coachCordinator" | "teacher" | "commentary" | "file">
export type DeleteDialogType = Pick<CollaboratorModel, "_id" | "name" | "lastname">
export type AddCommentaryType = Pick<CollaboratorModel, "_id" | "name" | "lastname" | "commentary">

export interface UpdateCollaboratorModel extends CollaboratorModel{
    entity: {
        _id: string;
        file?: string;
        name: string;
        lastname: string;
        age: number;
        year: number;
        departament: string;
        language: string;
        research: boolean;
        jobCoach: string;
        coachCordinator: string;
        teacher: string;
    }
}