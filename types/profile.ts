export interface IUserProfileData {
    email: string;
    createdAt: Date;
    lastName: string;
    firstName: string;
    role: 'ADMIN' | 'DEVELOPER' | 'PROJECT_MANAGER';
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

