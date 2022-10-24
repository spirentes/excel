import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';
import { CustomValidationService } from '../services/custom-validation.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private route: Router,
    private toast: HotToastService,
    private authService: AuthenticationService,
  ) {}
  signUpForm!: FormGroup;
  ngOnInit(): void {

    this.signUpForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
  
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
  submit() {
    const { userName, email, password } = this.signUpForm.value;
    this.authService
      .signUp(userName!, email!, password!)
      .pipe(
        this.toast.observe({
          success: 'sgin-up successfulyy',
          loading: 'loading..',
          error: (err) => 'there is an error' + err,
        })
      )
      .subscribe(() => {
        
        this.route.navigate(['/home']);
      });
  }
}
