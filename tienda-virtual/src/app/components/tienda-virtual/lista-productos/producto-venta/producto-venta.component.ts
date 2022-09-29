import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { MensajeroService } from 'src/app/services/mensajero.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallesComponent } from './detalles/detalles.component';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'


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

  constructor(private msj : MensajeroService,
    private dialog: MatDialog,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    let idPlantin = this.item.id;
  }

  handleAgregarAlCarrito() {
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


  verDetalles(plantin: any = {}){
    const dialogRef: MatDialogRef<any> = this.dialog.open(DetallesComponent, {
      width: '750px',
      height: '800px',
      disableClose: true,
      data: plantin
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
      })
  }

  
}
