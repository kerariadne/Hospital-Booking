import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { UserService } from '../Services/user.service';
import { DoctorService } from '../Services/doctor.service';
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  adminData = { email: '', password: '' };
  userCount = 0;
  doctorCount = 0;
  users: any[] = [];
  categories: any[] = [];

  doctors: any[] = [];

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private doctorService: DoctorService,
    private categoryService: CategoryService
  ) {}
  ngOnInit() {
    this.adminService.getReports().subscribe((data) => {
      this.userCount = data.UserCount;
      this.doctorCount = data.DoctorCount;
    });
    this.getAllDoctors();
    this.getAllUsers();
    this.getAllCategories();
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  deleteDoctor(id: number) {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      this.getAllDoctors();
    });
  }

  updateDoctor(id: number, doctor: any) {
    this.doctorService.updateDoctor(id, doctor).subscribe(() => {
      this.getAllDoctors();
    });
  }

  addAdmin() {
    this.adminService.addAdmin(this.adminData).subscribe({
      next: (response) => alert('Admin added successfully'),
      error: (error) => alert('Failed to add admin'),
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  updateUser(id: number, user: any) {
    this.userService.updateUser(id, user).subscribe(() => {
      this.getAllUsers();
    });
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateCategory(category: any) {
    this.categoryService.updateCategory(category).subscribe(() => {
      this.getAllCategories();
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getAllCategories();
    });
  }
}
