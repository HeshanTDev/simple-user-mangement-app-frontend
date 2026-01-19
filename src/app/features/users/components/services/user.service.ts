import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  //get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  //get all users
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`);
  }

  //add user
  addUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/user`, user);
  }

  //update user
  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/user/${id}`, user);
  }

  //delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${id}`);
  }

}
