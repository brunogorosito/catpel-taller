import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { MensajeroService } from 'src/app/services/mensajero.service';
import { ProductoService } from 'src/app/services/producto.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  producto: Producto;
  item: any;
  rating1: number;
  public form: FormGroup;
  ratingProm: number
  coments: any[] = [];

  comment: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<DetallesComponent>,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productoService: ProductoService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.comment = new FormGroup({
      name: new FormControl('User'),
      description: new FormControl('', Validators.required),
    });
    this.activatedRoute.paramMap.subscribe(_params => {
      this.rating1 = this.data[0];
      this.item = this.data[1]
      this.ratingProm = 3;
      this.form = this.fb.group({
        rating1: [this.rating1],
      })
      this.productoService.getComments(this.item.id).subscribe(response=>{
        this.coments = response.content
      })
    })
  }

  sendComment(){
    this.productoService.sendComment(this.comment.get("description").value,this.form.get("rating1").value, this.item.id).subscribe(u =>{
      Swal.fire({
        icon: 'success',
        title: 'Comentario enviado...',
        backdrop: `
        rgba(0,0,0,0.4)
      `
      })
    })
  }

  backClicked() {
    this.dialogRef.close();
  }



}
