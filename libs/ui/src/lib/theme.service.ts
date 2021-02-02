import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly DARK_THEME = 'dark-theme';
  private isDarkTheme$ = new BehaviorSubject(false);

  constructor(private overlayContainer: OverlayContainer) {
    if (localStorage.getItem('isDarkTheme')) {
      this.isDarkTheme$.next(true);
      this.addToOverlay();
    }
  }

  changeTheme(): void {
    this.isDarkTheme$.next(!this.isDarkTheme$.value);
    if (this.isDarkTheme$.value) {
      localStorage.setItem('isDarkTheme', 'true');
      this.addToOverlay();
    } else {
      localStorage.removeItem('isDarkTheme');
      this.removeFromOverlay();
    }
  }

  private addToOverlay(): void {
    this.overlayContainer.getContainerElement().classList.add(this.DARK_THEME);
  }

  private removeFromOverlay(): void {
    this.overlayContainer
      .getContainerElement()
      .classList.remove(this.DARK_THEME);
  }

  get isDarkTheme(): Observable<boolean> {
    return this.isDarkTheme$.asObservable();
  }
}
