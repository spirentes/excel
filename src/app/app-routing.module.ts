import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { redirectLoggedInTo, canActivate ,redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AppointmentComponent } from './appointment/appointment.component';
import { JobsComponent } from './jobs/jobs.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
const redirectToHome = () => redirectLoggedInTo(['/home']);
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'appointment', component: AppointmentComponent },
      { path: 'jobs', component: JobsComponent },
      {
        path: 'signIn',
        component: SignInComponent,
        ...canActivate(redirectToHome),
      },
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'signUp',
        component: SingUpComponent,
        ...canActivate(redirectToHome),
      },
      { path: 'courses', component: CoursesComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ],
    
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
