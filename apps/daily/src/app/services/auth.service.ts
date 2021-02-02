import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogin$ = new BehaviorSubject(false);

  constructor() {}

  isAuth(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  isAuthValue(): boolean {
    return this.isLogin$.value;
  }

  authLogin(isLogin: boolean): void {
    this.isLogin$.next(isLogin);
  }
}
