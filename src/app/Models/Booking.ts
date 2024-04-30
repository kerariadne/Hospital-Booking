import { User } from './User';
import { Doctor } from './Doctor';

export class Booking {
    id: number;
    userId: number;
    user: User;
    bookingDate: Date;
    doctorId: number;
    doctor: Doctor;

    constructor(id: number, userId: number, user: User, bookingDate: Date, doctorId: number, doctor: Doctor) {
        this.id = id;
        this.userId = userId;
        this.user = user;
        this.bookingDate = bookingDate;
        this.doctorId = doctorId;
        this.doctor = doctor;
    }
}