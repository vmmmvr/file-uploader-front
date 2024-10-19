export interface User {
    id: number;
    uid: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date | null;
}


export interface UserloginRequest {
    email: string;
    password: string;
}
export interface UserSignupRequest {
    email: string;
    name: string;
    password: string;
}
export interface UserGetMeRequest {
    token: string
}