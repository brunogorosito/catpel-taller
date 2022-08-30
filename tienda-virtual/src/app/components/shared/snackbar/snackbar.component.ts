import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  color: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {
    this.color = data.type === "success" ? 'white' : "#ff6262";
  }
}

export class SnackbarData {
  type: "success" | "error" = "success";
  title: string;
  body?: string;
}
