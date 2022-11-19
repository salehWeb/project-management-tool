export interface ICreateProject {
    projectMangerId: number;
    title: string;
    description: string;
}

export interface IProject {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    isClosed: boolean;
    projectManger: {
        id: number;
        firstName: string;
        lastName: string;
    };
}