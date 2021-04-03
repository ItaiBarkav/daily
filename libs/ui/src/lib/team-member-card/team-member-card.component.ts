import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { merge } from 'rxjs';

@Component({
  selector: 'manage-tool-team-member-card',
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamMemberCardComponent implements OnInit {
  @Input() name: string;
  @Input() inputGoals: string[];
  @Input() inputFinishedGoals: string[];
  @Output() delete = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<void>();

  goals = new FormArray([]);
  finishedGoals = new FormArray([]);

  constructor() {}

  ngOnInit(): void {
    if (this.inputGoals?.length > 0) {
      this.inputGoals.forEach((element) => {
        this.addGoal(element);
      });
    }
    if (this.inputFinishedGoals?.length > 0) {
      this.inputFinishedGoals.forEach((element) => {
        this.addFinishedGoal(element);
      });
    }
  }

  addGoal(goal: string = ''): void {
    this.goals.push(
      new FormControl(goal, [Validators.required, Validators.minLength(2)])
    );
  }

  removeFormControl(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
  }

  goalChecked(event: MatCheckboxChange, index: number): void {
    if (event.checked) {
      this.finishedGoals.push(this.spliceFormArray(this.goals, index));
      this.disableFormControls();
      this.emitValueChange();
    }
  }

  finishedGoalChecked(event: MatCheckboxChange, index: number): void {
    if (!event.checked) {
      this.goals.push(this.spliceFormArray(this.finishedGoals, index));
      this.enableFormControls();
      this.emitValueChange();
    }
  }

  deleteCard(): void {
    this.delete.emit(this.name);
  }

  valueChanges(): void {
    merge(
      this.goals.valueChanges,
      this.finishedGoals.valueChanges
    ).subscribe(() => this.emitValueChange());
  }

  private emitValueChange(): void {
    return this.valueChange.emit();
  }

  private addFinishedGoal(finishedGoal: string = ''): void {
    this.finishedGoals.push(
      new FormControl(finishedGoal, [
        Validators.required,
        Validators.minLength(2),
      ])
    );
    this.disableFormControls();
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
