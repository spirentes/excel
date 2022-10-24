import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {}

}
