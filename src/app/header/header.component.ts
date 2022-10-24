import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private route: Router
  ) {}
  user = this.authService.curentUser;
  ngOnInit(): void {}
  logOut() {
    this.authService.logout().subscribe(() => {
      //localStorage.clear();
      this.route.navigate(['/signIn']);
    });
  }
}
