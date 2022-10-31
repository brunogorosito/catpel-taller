import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { MensajeroService } from 'src/app/services/mensajero.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallesComponent } from './detalles/detalles.component';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-producto-venta',
  templateUrl: './producto-venta.component.html',
  styleUrls: ['./producto-venta.component.css']
})
export class ProductoVentaComponent implements OnInit {

  @Input() item : any;
  agregado: boolean = false;
  disponible : boolean;
  stock : number;
  form: FormGroup;
  
  constructor(private msj : MensajeroService,
    private dialog: MatDialog,
    private productoService: ProductoService,
    private fb: FormBuilder) { 
      this.form = this.fb.group({
        rating: ['', Validators.required],
      })
    }

  ngOnInit(): void {

  }

  handleAgregarAlCarrito() {
    this.productoService.agregarAlCarrito(this.item).subscribe(response =>{
      console.log(response)
    })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text:"Agregado al carrito!",
        showConfirmButton: false,
        timer: 1500,
        width:"20rem"
      })
      this.msj.enviarMsj(this.item);
  }


  openDialog(){
    const dialogRef: MatDialogRef<any> = this.dialog.open(DetallesComponent, {
      disableClose: true,
      data:[ this.form.get("rating").value, this.item]
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.form.reset()
      })
  }

  
}
