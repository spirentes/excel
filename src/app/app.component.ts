import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private route: Router,
    private wowService: NgwWowService,
    private authService: AuthenticationService
  ) {
    this.wowService.init();
  }
  roleUser: any;
  userStatus = this.authService.userStatus;
  ngOnInit(): void {
    /* this.roleUser = localStorage.getItem('role_user');
    if (this.roleUser === 'admin') {
      this.route.navigate(['/admin']);
    } else {
      this.route.navigate(['']);
    }
*/  
    this.authService.userChanges();
     this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    console.log(this.userStatus)
  }
    //let user = localStorage.getItem('user'); // get from storage (format json)
    //this.userStorage = JSON.parse(user!); // json to object
  }

