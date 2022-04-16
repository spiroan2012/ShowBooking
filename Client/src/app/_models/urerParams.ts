import { PaginationParams } from "./paginationParams";
import { User } from "./user";

export class UserParams extends PaginationParams{
    searchUsername: string ='';
    orderBy: string ='creationDate';

    constructor(user: User){
        super();
    }
}