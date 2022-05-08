export class CreateBooking{
    showId: number;
    dateOfShow: string;
    seats: string[];

    constructor(showId, dateOfShow, seats){
        this.showId = showId;
        this.dateOfShow = dateOfShow;
        this.seats = seats;
    }
}