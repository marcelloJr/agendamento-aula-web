import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NotifierModule } from 'angular-notifier';
import { NOTIFIER_CONFIG } from './config/constants';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatInputModule,
    NotifierModule.withConfig(NOTIFIER_CONFIG)
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
