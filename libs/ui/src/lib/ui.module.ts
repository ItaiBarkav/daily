import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@manage-tool/material';
import { DateTimeComponent } from './date-time/date-time.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TeamMemberCardComponent } from './team-member-card/team-member-card.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    TeamMemberCardComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    TeamMemberCardComponent,
  ],
})
export class UiModule {}
