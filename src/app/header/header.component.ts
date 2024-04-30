import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordService } from '../Services/reset-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public logo: string = '../../logo.png';
  public users: any = [];
  public email!: string;
  public name!: string;
  public lastname!: string;
  public personalNumber!: string; 
  public role!: string;
  public check: boolean = false;
  public loggedIn: boolean = false;


  constructor( private userService: UserService, public dialog: MatDialog,
    private fb: FormBuilder,
    private resetPassword: ResetPasswordService,
  
    private router: Router,
    private toast: NgToastService

  ) { 

  }

  ngOnInit() {
  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.userService.getName()
    .subscribe((value: any) =>{
      this.name = value;
     
    })

    this.userService.getemail()
    .subscribe((value: any) =>{
      this.email = value ;
    })

    this.userService.getRole()
    .subscribe((value: any) =>{
      let roleFromToken = this.userService.getRoleFromToken();
      this.role = value || roleFromToken;
    })

    

  }
  logout() {
    this.userService.signout();
  }

  loginError: boolean = false;
  loginForm!: FormGroup;

  resetPasswordByEmail!: string;
  checkEmail!: string;
  isValidEmail!: boolean;
  

  checkEmailValidation(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }


  confirmSend() {
    if (this.checkEmailValidation(this.resetPasswordByEmail)) {
      console.log(this.resetPasswordByEmail);
      this.loginForm.reset();
      const buttonClose = document.getElementById('close');
      buttonClose?.click();

      this.resetPassword
        .sendResetPasswordLink(this.resetPasswordByEmail)
        .subscribe({
          next: (res) => {
            this.toast.success({
              detail: 'Success',
              summary: 'Reset Sucess!',
              duration: 3000,
            });
            this.resetPasswordByEmail = '';
            const buttonRef = document.getElementById('close');
            buttonRef?.click();
          },
          error: (err) => {
            console.log(err);
            this.toast.error({
              detail: 'ERROR',
              summary: 'Something went wrong here!',
              duration: 3000,
            });
          },
        });
    } else {
      console.log('invalid email');
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(email, password);
      this.userService.login(email, password).subscribe({
        next: (response) => {
          console.log(response);
          this.loginForm.reset();
          this.loggedIn = true;
          this.userService.storeToken(response.accessToken); 
          this.userService.storeRefreshToken(response.refreshToken);

          let tokenPayload = this.userService.decodedToken();
          this.userService.setemail(tokenPayload.email);
          this.userService.setRole(tokenPayload.role);

          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 5000,
          });
          this.router.navigate(['user']);
        },
        error: (error) => {
          this.loginError = true;
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong',
            duration: 5000,
          });

          console.log(error);
        },
      });
    } else {
      console.log('form is not valid');
    }
  }


}
