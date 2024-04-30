import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { EmailService } from '../Services/email.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  loading = false;
  email: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
    private toast: NgToastService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      console.log(params); 
      this.email = params['email'];
      this.token = params['code'];
      this.token = decodeURIComponent(this.token.replace(/ /g, '+'));
      console.log(this.email, this.token); 
      this.verifyEmail(this.email, this.token);
  });
  }



  verifyEmail(email: string, token: string): void {
    this.loading = true;
    this.emailService.verifyEmail(email, token).subscribe({
      next: (response) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: response.Message, 
          duration: 3000,
        });
        this.router.navigate(['home']); 
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.toast.error({
          detail: 'ERROR',
          summary: error.error.message || 'Email Verification Failed  ',
          duration: 3000,
        });
        this.loading = false;
      }
    });
  }

}

