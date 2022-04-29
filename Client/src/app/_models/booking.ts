import { User } from "./user";

export interface Booking{
    bookingTimestamp: Date;
    dateOfShow: Date;
    user: User;
    numOfSeats: number;
    appeared: boolean;
    seats: string[];
}