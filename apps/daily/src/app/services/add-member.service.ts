import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddMemberService {
  private name$ = new BehaviorSubject<string>('');

  constructor() {}

  name(): Observable<string> {
    return this.name$;
  }

  AddName(name: string): void {
    this.name$.next(name);
  }
}
