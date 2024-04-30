import { Component } from '@angular/core';
import { ResetPassword } from '../Models/ResetPassword';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../Services/reset-password.service';
import { ConfirmPasswordValidator } from '../confirm-password.validator';
import  ValidateForm from '../validate';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  constructor(private fb: FormBuilder, private activated: ActivatedRoute,
    private toast: NgToastService,
    private router: Router,
    private resetPasswordService: ResetPasswordService) { }

 ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      });
    this.activated.queryParams.subscribe(val => {
      console.log(val);
      this.emailToReset = val['email'];
      let urlToken = (val['code']);
      this.emailToken = urlToken.replace(/ /g, '+');
      console.log(this.emailToken)
    });
  }
  reset() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      this.resetPasswordService.resetPassword(this.resetPasswordObj) 
        .subscribe({
          next: (res) => {
            this.toast.success({
              detail: 'SUCCESS',
              summary: res.message,
              duration: 3000,
            });
            this.router.navigate(['home'])
          },
          error: (err) => {
            console.log(err);
            this.toast.error({
              detail: 'ERROR',
              summary: "Something went wrong",
              duration: 3000,
            });
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }
}
