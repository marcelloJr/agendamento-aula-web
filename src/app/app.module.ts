import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NotifierModule } from 'angular-notifier';
import { NOTIFIER_CONFIG } from './config/constants';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { Interceptors } from './utils/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    NotifierModule.withConfig(NOTIFIER_CONFIG)
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptors,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
