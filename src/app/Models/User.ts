import { Booking } from './Booking';

export class User {
    id: number;
    name: string;
    lastName: string;
    password: string; 
    personalNumber: string;
    email: string;
    numberOfBookings: number;
    bookings: Booking[];

    constructor(id: number, name: string, lastName: string, password: string, personalNumber: string, email: string, numberOfBookings: number, bookings: Booking[]) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.personalNumber = personalNumber;
        this.email = email;
        this.numberOfBookings = numberOfBookings;
        this.bookings = bookings;
    }
}