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


export interface ILabour {
    _id: string;
    jobType: string;
    perHourRate: number;
    minHour: number;
    afterHourRate: number
}

export interface IEquipment {
    _id: string;
    name: string;
    equipmentImage: string;
    hourlyRate: number;
    minHour: number;
    floatCharge: number;
    description: string;
}

export interface LabourFormValues {
    jobType: string;
    perHourRate: number;
    minHour: number;
    afterHourRate: number
}