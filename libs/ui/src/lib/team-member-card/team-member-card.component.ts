import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'manage-tool-team-member-card',
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamMemberCardComponent {
  @Input() name: string;
  @Output() delete = new EventEmitter<string>();

  goals = new FormArray([]);
  finishedGoals = new FormArray([]);

  constructor() {}

  addGoal(): void {
    this.goals.push(
      new FormControl('', [Validators.required, Validators.minLength(2)])
    );
  }

  removeFormControl(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
  }

  goalChecked(event: MatCheckboxChange, index: number): void {
    if (event.checked) {
      this.finishedGoals.push(this.spliceFormArray(this.goals, index));
      this.disableFormControls();
    }
  }

  finishedGoalChecked(event: MatCheckboxChange, index: number): void {
    if (event.checked === false) {
      this.goals.push(this.spliceFormArray(this.finishedGoals, index));
      this.enableFormControls();
    }
  }

  deleteCard(): void {
    this.delete.emit(this.name);
  }

  private spliceFormArray(formArray: FormArray, index: number): FormControl {
    return formArray.controls.splice(index, 1)[0] as FormControl;
  }

  private disableFormControls(): void {
    this.finishedGoals.controls.forEach((control: FormControl) => {
      control.disable();
    });
  }

  private enableFormControls(): void {
    this.goals.controls.forEach((control: FormControl) => {
      control.enable();
    });
  }
}
