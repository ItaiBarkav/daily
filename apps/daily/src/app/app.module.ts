import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@manage-tool/material';
import { UiModule } from '@manage-tool/ui';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    UiModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
