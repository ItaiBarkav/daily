import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;

  constructor() {}

  isAuth(): boolean {
    return this.isLogin;
  }
}
