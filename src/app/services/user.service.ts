import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../model/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  baseUrl: string = 'https://jsonplaceholder.cypress.io/';

  constructor(private http: HttpClient) { }

  listUser() {
    return this.http.get<IUser[]>(`${this.baseUrl}` + 'users');
  }

  viewUser(id: number) {
    //return this.http.get<IUser>(this.baseUrl + 'users/' + id);
    return this.http.get<IUser>(`${this.baseUrl}` + 'users/' + `${id}`);
  }

  addUser(user: IUser) {
    return this.http.post<IUser>(`${this.baseUrl}` + 'users', user);
  }

  deleteUser(id: number) {
    return this.http.delete<void>(`${this.baseUrl}` + 'users/' + `${id}`);
  }

  updateUser(id: number, user: IUser) {
    return this.http.put<void>(`${this.baseUrl}` + 'users/' + `${id}`, user);
  }
}


// https://bobbyhadz.com/blog/typescript-type-null-is-not-assignable-to-type-string

// https://stackoverflow.com/questions/65659019/error-ts2322-type-string-null-is-not-assignable-to-type-number