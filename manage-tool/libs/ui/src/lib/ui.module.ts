import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@manage-tool/material';
import { DateTimeComponent } from './date-time/date-time.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [HeaderComponent, FooterComponent, DateTimeComponent],
  exports: [HeaderComponent, FooterComponent, DateTimeComponent],
})
export class UiModule {}
