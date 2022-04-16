import { PaginationParams } from "./paginationParams";

export class ShowParams extends PaginationParams{
    searchTitle: string = '';

    constructor(){
        super();
    }
}