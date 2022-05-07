import { Show } from "./show";
import { User } from "./user";

export interface Booking{
    bookingTimestamp: Date;
    dateOfShow: Date;
    user: User;
    numOfSeats: number;
    appeared: boolean;
    show: Show;
    seats: string[];
}