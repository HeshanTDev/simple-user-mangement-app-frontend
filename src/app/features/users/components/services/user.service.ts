import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../../shared/models/user-response.model';
import { UserRequest } from '../../../../shared/models/user-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = "http://localhost:8081/user-management/users";

  constructor(private http: HttpClient) { }

  //get all users
  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  //get all users
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  //add user
  addUser(user: UserRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, user);
  }

  //update user
  updateUser(id: number, user: UserRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  //delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
