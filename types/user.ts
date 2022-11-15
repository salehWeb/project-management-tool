export interface IUser {
    id: number;
    createdAt: Date;
    email: string;
    firstName: string
    lastName: string
    role: 'PROJECT_MANAGER' | 'USER' | 'DEVELOPER' | 'ADMIN';
    token: string;
}

export interface ILogin {
    password: string
    email: string
}

export interface ISingUp {
    password: string
    firstName: string
    lastName: string
    email: string
}

export interface IMangeUsersRoles {
    role: 'PROJECT_MANAGER' | 'USER' | 'DEVELOPER';
    usersIds: number[];
}

export interface IChangePassword {
    currentPassword: string; 
    newPassword: string;
}