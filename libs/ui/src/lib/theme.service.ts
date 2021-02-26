import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly DARK_THEME = 'dark-theme';
  private readonly IS_DARK_THEME = 'isDarkTheme';
  private isDarkTheme$ = new BehaviorSubject(true);

  constructor(private overlayContainer: OverlayContainer) {
    this.addToOverlay();

    if (localStorage.getItem(this.IS_DARK_THEME)) {
      this.isDarkTheme$.next(true);
      this.addToOverlay();
    }
  }

  changeTheme(): void {
    this.isDarkTheme$.next(!this.isDarkTheme$.value);
    if (this.isDarkTheme$.value) {
      localStorage.setItem(this.IS_DARK_THEME, 'true');
      this.addToOverlay();
    } else {
      localStorage.removeItem(this.IS_DARK_THEME);
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
