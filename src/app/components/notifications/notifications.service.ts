import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, actionCaption: string = "Fechar") {
    this._snackBar.open(message, actionCaption, {
      duration: 3000
    });
  }
}
