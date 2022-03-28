export interface User{
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    token: string;
    isDisabled: boolean;
    roles: string[];
}