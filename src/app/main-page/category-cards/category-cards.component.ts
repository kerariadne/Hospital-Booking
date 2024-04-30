import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.css'],
})
export class CategoryCardsComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = null;
  doctors: any[] = [];
  categoryCounts: any []= [];
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.loadCategories();
    this.doctorService.currentDoctorList.subscribe(doctors => this.doctors = doctors);
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      if (this.categories.length > 0) {
        this.searchByCategoryName(this.categories[0].name);
      }
    });
  }

  searchByCategoryName(categoryName: string): void {
    this.doctorService.getDoctorsByCategoryName(categoryName).subscribe(
      (data) => this.doctors = data,
      (error) => console.error('Error fetching doctors by category', error)
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => ({
        ...category,
        loading: false,
        duplicateCount: 0
      }));
      this.categories.forEach(category => this.loadDuplicateCount(category));
    });
  }

  loadDuplicateCount(category: any): void {
    category.loading = true;
    this.categoryService.countCategoryDuplicates(category.name).subscribe({
      next: (data) => {
        category.duplicateCount = data.duplicateCount;
        category.loading = false;

        this.categories = this.categories.filter((category, index, self) =>
          index === self.findIndex((c) => c.name === category.name)
        );
      },
      error: () => {
        category.loading = false;
        category.error = "Failed to load duplicate count";
      }
    });


  }

  getDoctorsByDoctorsName(name: string): void {
    this.doctorService.getDoctorsByName(name).subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (error) => console.error('Error fetching doctors by name', error),
      complete: () => console.log('Completed fetching doctors by name'),
    });
  }

  goToDoctorDetails(doctorId: number): void {
    this.router.navigate(['/doctor-details', doctorId]);
  }
}
