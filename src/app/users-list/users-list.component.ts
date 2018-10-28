import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users = [];
  constructor(private userListService: UsersListService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userListService.getUserList()
      .subscribe(users => {
        this.users = users;
      });
  }

}
