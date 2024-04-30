
import { Category } from './Category';
import { Booking } from './Booking';

export class Doctor {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string; 
    image: string;
    cv: string;
    personalNumber: string;
    shortDescription: string;
    numberOfBookings: number;
    CategoryName: string;
    bookings: Booking[];
    

    constructor(id: number, name: string, lastName: string, email: string, image:string, password: string,cv:string, personalNumber: string, shortDescription: string, numberOfBookings:number, categoryName:string, bookings: Booking[] ) {
        // super();
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.image = image;
        this.password = password;
        this.cv = cv;
        this.personalNumber = personalNumber;
        this.CategoryName = categoryName;
        this.bookings = bookings;
        this.shortDescription = shortDescription;
        this.numberOfBookings = numberOfBookings;
    }
}