import { PaginationParams } from "./paginationParams";

export class HallParams extends PaginationParams{
    searchTitle: string = '';

    constructor(){
        super();
    }
}