import { Injectable, Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/shared/snackbar/snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  defaultDuration = 3000;

  constructor(private snackBar: MatSnackBar) { }

  show( options: { title: string, body?: string, duration?: number, type?: "success" | "error" }) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        panelClass: [options.type ? options.type : 'success'],
        duration: options.duration ? options.duration : this.defaultDuration,
        horizontalPosition: "right",
        data: options
      });
  }
}
