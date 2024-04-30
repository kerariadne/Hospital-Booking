import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CategoryListComponent } from './category-list/category-list.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'user', component: UserPageComponent}, //canActivate: [AuthGuard] 
  { path: 'register/user', component: UserRegistrationComponent },
  { path: 'register/doctor', component: DoctorRegistrationComponent },
  { path: 'admin/categorylist', component: CategoryListComponent },//canActivate: [AuthGuard]
  { path: 'admin', component: AdminPanelComponent },//canActivate: [AuthGuard]
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'confirm', component: VerifyEmailComponent },
  { path: 'verify-2fa-code', component: MainPageComponent}
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
