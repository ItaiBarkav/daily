import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeamSchedule } from '@manage-tool/models';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'manage-tool-team-information',
  templateUrl: './team-information.component.html',
  styleUrls: ['./team-information.component.scss'],
})
export class TeamInformationComponent {
  @Input() showTeamName = true;
  @Input() saveButtonName = 'Login';
  @Input() title = 'Login';
  @Output() teamSchedule = new EventEmitter<TeamSchedule>();

  quarters = [1, 2, 3, 4];
  sprintNumbers = [1, 2, 3, 4, 5, 6];

  teamInfoForm = this.fb.group({
    teamName: [, [Validators.required, Validators.minLength(2)]],
    startDate: [, Validators.required],
    endDate: [, Validators.required],
    sprintDuration: [
      ,
      [Validators.required, Validators.min(1), Validators.max(31)],
    ],
    sprintNumber: [, Validators.required],
    quarter: [, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    this.updateSprintDuration();
    this.updateSprintendDate();
  }

  onSave(): void {
    this.teamSchedule.emit(this.teamInfoForm.value);
  }

  private updateSprintDuration(): void {
    this.teamInfoForm.controls.endDate.valueChanges.subscribe(
      (endDate: Date) => {
        if (this.teamInfoForm.controls.endDate.value) {
          this.teamInfoForm.controls.sprintDuration.setValue(
            this.daysDiff(this.teamInfoForm.controls.startDate.value, endDate)
          );
        }
      }
    );
  }

  private updateSprintendDate(): void {
    this.teamInfoForm.controls.sprintDuration.valueChanges
      .pipe(
        pairwise(),
        filter(([prev, curr]: [number, number]) => prev !== curr)
      )
      .subscribe(([prev, curr]: [number, number]) => {
        if (this.teamInfoForm.controls.endDate.value) {
          this.teamInfoForm.controls.endDate.setValue(
            this.calcEndDate(this.teamInfoForm.controls.startDate.value, curr)
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
