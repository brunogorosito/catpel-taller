import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  tienda: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ContactComponent>,
  private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(_params => {
      if(this.data === "Vivero_2" ){
        this.tienda = "Vivero Pasaje Gutierrez"
      }else{
        if(this.data === "Vivero_1"){
          this.tienda = "Vivero KM N°11"
        }else{
          this.tienda = null
        }
      }
    })
   
  }

  backClicked() {
    this.dialogRef.close();
  }
}
