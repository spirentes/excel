import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { NgwWowService } from 'ngx-wow';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private route: Router,
    private wowService: NgwWowService
  ) {
    this.wowService.init();
  }
  ngOnInit(): void {}

  user = this.authService.curentUser;
  logOut() {
    this.authService.logout().subscribe(() => {
      this.route.navigate(['/signIn']);
    });
  }
}
