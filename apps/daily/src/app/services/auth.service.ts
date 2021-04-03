import { Injectable } from '@angular/core';
import { ApolloService } from '@manage-tool/apollo';
import { LoginStatus, TeamSchedule } from '@manage-tool/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogin$ = new BehaviorSubject<LoginStatus>({
    isLogin: false,
    teamName: null,
  });

  constructor(private apolloService: ApolloService) {}

  isAuth(): Observable<LoginStatus> {
    this.isLoginSubscription();
    return this.isLogin$.asObservable();
  }

  isAuthValue(): LoginStatus {
    return this.isLogin$.getValue();
  }

  authLogin(isLogin: boolean, teamName: string): void {
    this.isLogin$.next({
      isLogin: isLogin,
      teamName: teamName,
    });
  }

  private isLoginSubscription(): void {
    this.apolloService
      .teamSchedule()
      .subscribe((teamSchedule: TeamSchedule) => {
        if (teamSchedule) {
          this.authLogin(true, teamSchedule.teamName);
        }
      });
  }
}
