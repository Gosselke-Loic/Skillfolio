import { Document } from "mongoose";

export interface IUser extends Document {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly type: string;
    readonly role: string;
    readonly token: string;
}

export interface IUserSend {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly type: string;
    readonly role: string;
    readonly token: string;
}

export type IFormatUser = Omit<IUserSend, "password" | "type">
export type ISendAll = Omit<IUserSend, "password" | "token">