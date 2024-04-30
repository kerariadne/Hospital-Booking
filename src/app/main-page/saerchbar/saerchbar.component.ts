import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-saerchbar',
  templateUrl: './saerchbar.component.html',
  styleUrls: ['./saerchbar.component.css']
})
export class SaerchbarComponent {
  
  name!: string;
  categoryName!: string;
  doctors: any = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  search(): void {
    if (this.categoryName) {
      this.searchByCategoryName(this.categoryName);
    } else if (this.name) {
      this.searchByName(this.name);
    } else {
      console.log('No valid search criteria provided');
      
    }
  }

 
  searchByName(firstName: string): void {
    this.doctorService.getDoctorsByName(firstName).subscribe(
      (data) => {
        this.doctors = data;
        this.doctorService.changeDoctorList(this.doctors);
      },
      (error) => console.error('Error fetching doctors by name', error)
    );
  }
  
  searchByCategoryName(categoryName: string): void {
    this.doctorService.getDoctorsByCategoryName(categoryName).subscribe(
      (data) => {
        this.doctors = data;
        this.doctorService.changeDoctorList(this.doctors);
      },
      (error) => console.error('Error fetching doctors by category', error)
    );
  }
}
