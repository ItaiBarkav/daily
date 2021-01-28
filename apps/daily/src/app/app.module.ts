import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@manage-tool/material';
import { UiModule } from '@manage-tool/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    UiModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
