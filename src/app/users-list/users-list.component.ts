import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users = [];
  usersBackup = [];
  isSearchBarActive = false;
  constructor(private userListService: UsersListService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userListService.getUserList()
      .subscribe(users => {
        this.users = users;
        this.usersBackup = users;
      });
  }

  revertList() {
    this.users = this.usersBackup;
    this.isSearchBarActive = false;
  }

  sortList() {
    this.users = this.users.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    console.log(this.users);
  }

  displayUpdatedList(keyWord) {
    this.users = this.findMatch(keyWord);
  }

  findMatch(keyWord) {
    return this.users.filter(user => {
      const regex = new RegExp(keyWord, 'gi');
      return user.name.match(regex) || user.username.match(regex) || user.email.match(regex);
    });
  }

}
