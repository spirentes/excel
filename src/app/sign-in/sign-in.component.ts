import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
} from '@angular/forms';
import {  Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  userform = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService:AuthenticationService,
    private toast: HotToastService
  ) {}
  submit()
  {
    if(!this.userform.valid)
    return;
   const {email,password}=this.userform.value;
    this.authService.login(email!,password!).pipe(
      this.toast.observe({
        success:"logged in successfulyy",
        loading:"loading..",
        error:(err)=>'Something did not work, reason: ' + err,
      })
    ).subscribe(()=>{this.route.navigate(['/home'])});
  }
    
  }

