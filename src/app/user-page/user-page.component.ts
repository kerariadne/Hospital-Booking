import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { EmailService } from '../Services/email.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  public code:string = '';
  public  showForm :boolean = false;
  public users: any = [];
  public email: string = '';
  public role: string = '';
  public token: string = '';
  public name!: string;
  public lastName!: string;
  public  personalNumber!: string;
  public id!: number;

  public editName!: string;
  public editLastName!: string;
  public editPersonalNumber!: string;
 

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private emailService: EmailService,
    private toast: NgToastService
  ) {}

  ngOnInit() {

    /*
    this.route.queryParams.subscribe((params) => {

      console.log(params); 
      this.token = params['code'];
      this.email = params['email'];
      this.token = decodeURIComponent(this.token.replace(/ /g, '+'));


    });*/

    this.userService.getName().subscribe(name => this.name = name);
    this.userService.getLastname().subscribe(lastName => this.lastName = lastName);
    this.userService.getId().subscribe(id => this.id = id);
    this.userService.getPersonalNumber().subscribe(personalNumber => this.personalNumber = personalNumber);

    this.userService.getemail().subscribe((value: any) => {
      let emailFromToken = this.userService.getemailFromToken();
      this.email = value || emailFromToken;
    });

    this.userService.getRole().subscribe((value: any) => {
      let roleFromToken = this.userService.getRoleFromToken();
      this.role = value || roleFromToken;
    });
  }
  logout() {
    this.userService.signout();
  }


 
  

  editProfile() {
    this.editName = this.name;
    this.editLastName = this.lastName;
    this.editPersonalNumber = this.personalNumber;
  
  }

  updateProfile() {
    const updatedUser = {
      name: this.editName,
      lastName: this.editLastName,
      personalNumber: this.editPersonalNumber
    };
    this.userService.updateUser(this.id, updatedUser).subscribe(() => {
      this.name = this.editName;
      this.lastName = this.editLastName;
      this.personalNumber = this.editPersonalNumber;

    });
  }

  sendEmailForTwoFactorAuth() {

    this.emailService.send2FACode(this.email).subscribe({
      next: (response) => {
        this.showForm = true;
        console.log('2 FA email sent successfully', response);
        this.toast.success({
          detail: 'SUCCESS',
          summary: response.message,
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Failed to send 2FA email', error);
        this.toast.error({
          detail: 'ERROR',
          summary: 'Failed to send 2FA email',
          duration: 3000,
        });
      },
    });
  }

  verifyCode() {
    this.route.queryParams.subscribe((params) => {
      console.log(params); 
      this.token = params['code'];
    });

    this.emailService.verify2FACode(this.email, this.token).subscribe({
      next: (response) => {
        console.log('Code verified successfully', response);
        this.toast.success({
          detail: 'SUCCESS',
          summary: response.message,
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Error verifying code', error);
        this.toast.error({
          detail: 'ERROR',
          summary: 'Error verifying code',
          duration: 3000,
        });
      },
    });

    this.showForm = false;
  }

  sendEmail(): void {
    if (this.email) {
      this.emailService.sendConfirmEmail(this.email).subscribe({
        next: (response) => {
          console.log('Verification email sent successfully', response);
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 3000,
          });
        },
        error: (error) => {
          console.error('Failed to send verification email', error);
          this.toast.error({
            detail: 'ERROR',
            summary: 'Failed to send verification email',
            duration: 3000,
          });
        },
      });
    } else {
      console.log('No email provided');
    }
  }
}
