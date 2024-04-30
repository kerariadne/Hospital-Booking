import { Component } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { DoctorService } from '../Services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
 categories: any[] = [];

  constructor(
    private doctorService: DoctorService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategoriesWithDoctors();
  }

  loadCategoriesWithDoctors(): void {
    this.categoryService.getCategories().subscribe(categories => {
      categories.forEach(category => {
        this.doctorService.getDoctorsByCategoryName(category.name).subscribe(doctors => {
          if (doctors.length > 0) { 
            this.categories.push({
              ...category,
              doctors: doctors
            });
          }
        });
      });
    });
  }

  deleteDoctor(doctorId: number) {
    this.doctorService.deleteDoctor(doctorId).subscribe(() => {
      alert('Doctor deleted successfully');
      this.loadCategoriesWithDoctors();
    });
  }

  editDoctor(doctorId: number) {
    this.router.navigate(['/edit-doctor', doctorId]);
  }

}
