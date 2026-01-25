import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../../shared/models/user-response.model';
import { UserService } from '../services/user.service';
import { NavigationEnd, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {

  totalUsers: number = 0;

  ngOnInit(): void {
    this.getAllUser();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getAllUser();
      }
    })
  }

  users: UserResponse[] = [];
  searchUsers: UserResponse[] = [];

  constructor(private userService: UserService,
    private router: Router
  ) { }

  getAllUser() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.searchUsers = data;
      console.log(this.users);
    })
  }

  searchUser(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.users = this.searchUsers.filter(user => user.name.toLowerCase().includes(searchValue));
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getAllUser();
    })
  }

}
