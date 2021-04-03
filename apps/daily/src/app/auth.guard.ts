import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginStatus } from '@manage-tool/models';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.authService.isAuth().subscribe((loginStatus: LoginStatus) => {
      if (!loginStatus.isLogin) {
        this.router.navigate(['/login']);
      }
    });

    return this.authService.isAuthValue().isLogin;
  }
}
