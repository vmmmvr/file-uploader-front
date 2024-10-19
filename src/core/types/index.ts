import { User } from "../../interface/user";

export type UserResponseType = {
    data: User ;
    statusCode: number;
    status: "Success" | "Failed"
}
export type UserLoginResponseType = {
    data:{user: User, token: string} ;
    statusCode: number;
    status: "Success" | "Failed"
}