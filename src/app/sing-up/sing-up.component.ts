import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';
import { CustomValidationService } from '../services/custom-validation.service';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private route:Router,
    private toast :HotToastService,
    private authService:AuthenticationService
  ) {}
  signUpForm = this.fb.group(
    {
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
  );
  get userName() {
    return this.signUpForm.get('userName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get Password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  submit()
  {
    const{userName,email,password}=this.signUpForm.value;
     this.authService.signUp(userName!, email!, password!).pipe(
       this.toast.observe({
         success: 'sgin-up successfulyy',
         loading: 'loading..',
         error: 'there was an error',
       })
     ).subscribe(()=>{this.route.navigate(['/home'])});
  }
  ngOnInit(): void {}
}
