import { IProject } from "./project";
import { ITicket } from "./ticket";

export interface IUserProfileData {
    id: number;
    email: string;
    createdAt: Date;
    lastName: string;
    firstName: string;
    password: string;
    role: 'ADMIN' | 'DEVELOPER' | 'PROJECT_MANAGER';
    project: IProject[];
    ticket: ITicket[];
    avatar: string;
    about: string;
    title: string;
}

export interface IUpdateProfileGeneralInformation {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    about: string;
}