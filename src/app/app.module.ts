import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
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

@NgModule({
  declarations: [AppComponent, SignInComponent, HomeComponent, SingUpComponent, CoursesComponent, AboutComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    FontAwesomeModule,
    NgwWowModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
