import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, pairwise } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'manage-tool-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  quarters = [1, 2, 3, 4];

  loginForm = this.fb.group({
    teamName: ['', [Validators.required, Validators.minLength(2)]],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    sprintDuration: [
      '',
      [Validators.required, Validators.min(1), Validators.max(31)],
    ],
    quarter: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.updateSprintDuration();
    this.updateSprintendDate();
  }

  onLogin(): void {
    this.loginService.login(this.loginForm);
  }

  private updateSprintDuration(): void {
    this.loginForm.controls.endDate.valueChanges.subscribe((endDate: Date) => {
      if (this.loginForm.controls.endDate.value) {
        this.loginForm.controls.sprintDuration.setValue(
          this.daysDiff(this.loginForm.controls.startDate.value, endDate)
        );
      }
    });
  }

  private updateSprintendDate(): void {
    this.loginForm.controls.sprintDuration.valueChanges
      .pipe(
        pairwise(),
        filter(([prev, curr]: [number, number]) => prev !== curr)
      )
      .subscribe(([prev, curr]: [number, number]) => {
        if (this.loginForm.controls.endDate.value) {
          this.loginForm.controls.endDate.setValue(
            this.calcEndDate(this.loginForm.controls.startDate.value, curr)
          );
        }
      });
  }

  private daysDiff(startDate: Date, endDate: Date): number {
    return (endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24);
  }

  private calcEndDate(startDate: Date, sprintDuration: number): Date {
    return new Date(1000 * 60 * 60 * 24 * sprintDuration + startDate.valueOf());
  }
}
