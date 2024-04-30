import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SliderComponent } from './main-page/slider/slider.component';
import { SaerchbarComponent } from './main-page/saerchbar/saerchbar.component';
import { CategoryCardsComponent } from './main-page/category-cards/category-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './main-page/footer/footer.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {HeaderComponent} from './header/header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryListComponent } from './category-list/category-list.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserPageComponent,
    UserRegistrationComponent,
    DoctorRegistrationComponent,
    AdminPanelComponent,
    SliderComponent,
    SaerchbarComponent,
    CategoryCardsComponent,
    FooterComponent,
    HeaderComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
