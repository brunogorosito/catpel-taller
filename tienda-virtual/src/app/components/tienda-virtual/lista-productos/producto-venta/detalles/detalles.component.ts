import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { MensajeroService } from 'src/app/services/mensajero.service';
import { ProductoService } from 'src/app/services/producto.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  producto : Producto ;
  stock : number;
  disponible: boolean;
  nombre : string;
  imagenes: string[] = [];
  cantidadImg : number;
  descripcion: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetallesComponent>,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private msj : MensajeroService,
    private _config: NgbCarouselConfig) {
      _config.interval = 5000;
      _config.pauseOnHover = true
      _config.showNavigationArrows= true;
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(_params => {
      let id = this.data;
      if (id) {
        this.productoService.getPlantin(id).subscribe(producto => {
          this.descripcion = producto.abstract
          this.producto = producto;
          this.nombre = producto.title;
          this.verDisponibildad(id);
        });
      }
    })
  }

  backClicked() {
    this.dialogRef.close();
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
    this.msj.enviarMsj(this.producto);
    this.backClicked();
  }

  verDisponibildad(id: number){
    this.productoService.getStockPlantin(id).subscribe((stock: number) => {
      this.stock = stock;
      if(this.stock === 0){
        this.disponible = false;
      }else{
        this.disponible = true;
      }
    })
  }
  
}
