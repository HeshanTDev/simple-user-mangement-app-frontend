import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonModel } from '../../../../shared/models/common.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserMetaService {

  private userRoleUrl = 'http://localhost:8081/user-management/user-roles';
  private userStatusUrl = 'http://localhost:8081/user-management/user-statuses';
  private departmentUrl = 'http://localhost:8081/user-management/departments';

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<CommonModel[]> {
    return this.http.get<any>(this.userRoleUrl).pipe(map(res => res._embedded.userRoles as CommonModel[]));
  }

  getUserStatuses(): Observable<CommonModel[]> {
    return this.http.get<any>(this.userStatusUrl).pipe(map(res => res._embedded.userStatuses as CommonModel[]));
  }

  getDepartments(): Observable<CommonModel[]> {
    return this.http.get<any>(this.departmentUrl).pipe(map(res => res._embedded.departments as CommonModel[]));
  }

}
