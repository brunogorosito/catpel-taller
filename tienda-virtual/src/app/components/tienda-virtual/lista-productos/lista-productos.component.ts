import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { MensajeroService } from 'src/app/services/mensajero.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  @Input() productosSelected: any[];
  tienda : string;
  productos : Producto[];


  constructor( private mensajeService: MensajeroService) { }

  ngOnInit(): void {
    this.productos = this.productosSelected;
    console.log(this.productos)
    this.mensajeService.enviarPlantinesObservable.subscribe(productos => {
      this.productos = productos;
    })

   
  }

}
