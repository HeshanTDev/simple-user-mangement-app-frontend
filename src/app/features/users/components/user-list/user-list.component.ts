import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../../shared/models/user-response.model';
import { UserService } from '../services/user.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {

  ngOnInit(): void {
    this.getAllUser();
  }

  users: UserResponse[] = [];

  constructor(private userService: UserService) { }

  getAllUser() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getAllUser();
    })
  }

}
