export interface IProject {
    _id: string,
    projectImage: string;
    title: string;
    client: string;
    location: string;
    projectYear: string;
    duration: string;
    description: string;
}


export interface IProjectProp {
    project: IProject
}

export interface ProjectFormValues {
    projectImageFile?: FileList | null;
    title: string;
    client: string;
    location: string;
    projectYear: string;
    duration: string;
    description: string;
}