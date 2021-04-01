import { Injectable } from '@angular/core';
import { ApolloService } from '@manage-tool/apollo';
import { TeamSchedule } from '@manage-tool/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogin$ = new BehaviorSubject(false);

  constructor(private apolloService: ApolloService) {}

  isAuth(): Observable<boolean> {
    this.isLoginSubscribtion();
    return this.isLogin$.asObservable();
  }

  isAuthValue(): boolean {
    return this.isLogin$.value;
  }

  authLogin(isLogin: boolean): void {
    this.isLogin$.next(isLogin);
  }

  private isLoginSubscribtion(): void {
    this.apolloService
      .getTeamSchedule()
      .subscribe((teamSchedule: TeamSchedule) => {
        if (teamSchedule) {
          this.authLogin(true);
        }
      });
  }
}
