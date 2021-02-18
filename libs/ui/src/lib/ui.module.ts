import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@manage-tool/material';
import { DateTimeComponent } from './date-time/date-time.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SettingsDialogComponent } from './header/settings-dialog/settings-dialog.component';
import { TeamInformationComponent } from './team-information/team-information.component';
import { TeamMemberCardComponent } from './team-member-card/team-member-card.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    TeamMemberCardComponent,
    SettingsDialogComponent,
    TeamInformationComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    TeamMemberCardComponent,
    TeamInformationComponent,
  ],
})
export class UiModule {}
