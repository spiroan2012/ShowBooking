export interface User{
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    token: string;
    email: string;
    creationDate: Date;
    isDisabled: boolean;
    roles: string[];
}