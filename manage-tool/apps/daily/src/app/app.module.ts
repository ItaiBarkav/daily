import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@manage-tool/material';
import { UiModule } from '@manage-tool/ui';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
