import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { baseUrl } from '../config';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  validateLogin(user: User) {
    return this.http.post(`${baseUrl}/users/login`, {
      username: user.username,
      password: user.password,
    });
  }

  validateSignUp(user: User) {
    return this.http.get(`${baseUrl}/users/username/${user.username}`);
  }

  signUp(user: User) {
    return this.http.post(`${baseUrl}/users/signup`, {
      username: user.username,
      password: user.password,
      role: user.role,
    });
  }
}
