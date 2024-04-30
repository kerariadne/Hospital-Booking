import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  signUpForm!: FormGroup;
  loggedIn: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      email: ['', [Validators.required]], // , Validators.email
      personalNumber: [
        '',
        [Validators.required], //, Validators.pattern('^[0-9]{11}$')
      ],
    });
  }

  passwordValidator(formControl: FormControl) {
    const value = formControl.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    if (hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar) {
      return null;
    } else {
      return { passwordStrength: 'Password must contain uppercase, lowercase, number and special character' };
    }
  }

  registerError = false;

  onSignUp() {
    if (this.signUpForm.valid) {
      
      console.log(this.signUpForm.value);
      if (this.signUpForm.valid) {
        this.userService.register(this.signUpForm.value).subscribe({
          next: (response) => {
            
            this.signUpForm.reset();
           
            this.toast.success({detail:"SUCCESS", summary: response.message, duration: 5000});

            this.router.navigate(['/login']);
            
            console.log(response);
          },
          error: (error) => {
            console.log(error);
            this.registerError = true;
            this.toast.error({detail:"ERROR", summary: "Something went wrong", duration: 5000});


          },
        });
      } else {
       console.log('form is not valid');
        
      }
    }
  }
  
  
}
