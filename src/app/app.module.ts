import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SingUpComponent } from './sing-up/sing-up.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NgwWowModule } from 'ngx-wow';
import { AppointmentComponent } from './appointment/appointment.component';
import { JobsComponent } from './jobs/jobs.component';
import { AdminComponent } from './admin/admin.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import{ AdminRoutingModule}from'./admin/admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import{provideStorage,getStorage} from'@angular/fire/storage'


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SingUpComponent,
    CoursesComponent,
    AboutComponent,
    ContactComponent,
    AppointmentComponent,
    JobsComponent,
    AdminComponent,
    DasboardComponent,
    UserComponent,
    HeaderComponent,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(()=>getStorage()),
    FontAwesomeModule,
    NgwWowModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppLayoutModule,
    AdminRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}