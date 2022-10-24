import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  userList: any;
  constructor( private usersListService: UsersListService) {}

  ngOnInit(): void {
    this.usersListService.getAllUsers().subscribe((data)=>{this.userList=data})
  }
}
