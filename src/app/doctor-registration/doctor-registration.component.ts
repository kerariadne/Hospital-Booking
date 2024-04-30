import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent {
  signUpForm!: FormGroup;
  cvFile: File | null = null;
  photoFile: File | null = null;
  registerError: boolean = false;
  loggedIn: boolean = false;

  constructor(private fb: FormBuilder, private doctorService: DoctorService,

    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      personalNumber: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
     
    });
  }

  
  onCvFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    this.cvFile = files && files.length > 0 ? files[0] : null;
  }


  onPhotoFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    this.photoFile = files && files.length > 0 ? files[0] : null;
  }
  
  onRegister(): void {
    if (this.signUpForm.valid && this.cvFile && this.photoFile) {
      this.doctorService.registerDoctor(this.signUpForm.value, this.cvFile, this.photoFile).subscribe({
        next: (response) => {
          console.log('Doctor registered successfully', response);
          this.signUpForm.reset();
            this.toast.success({detail:"SUCCESS", summary: response.message, duration: 5000});
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.toast.error({detail:"ERROR", summary: "Something went wrong", duration: 5000});
        }
      });
    } else {
      this.signUpForm.markAllAsTouched(); 
    }
  }
}
