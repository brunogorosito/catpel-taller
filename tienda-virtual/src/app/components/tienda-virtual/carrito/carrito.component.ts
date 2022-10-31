import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemCarrito } from 'src/app/models/item-carrito';
import { Producto } from 'src/app/models/producto';
import { MensajeroService } from 'src/app/services/mensajero.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ConfirmacionCompraComponent } from './confirmacion-compra/confirmacion-compra.component';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import UserLogged from 'src/app/models/userLogged';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  productosAComprar : any[] = [];
  precioTotal = 0;
  stockPlantin : number = 0;
  quantity : number = 1;
  user: UserLogged;
  cantidades:FormGroup;

  constructor( private msj: MensajeroService,
    private dialog: MatDialog,
    private productoService: ProductoService,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUserValue()
    if(this.authService.getUserValue !== null ){
      this.authService.setUserIn(this.authService.getToken())
    }
    this.msj.getMsj().subscribe((product: any) => {
      this.addPlantinToCart(product);
    })
    this.cantidades = this._formBuilder.group({
      quantity: ['', [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.min(1)]]
    });
  }

  addPlantinToCart(product: any) {
    if(this.authService.getUserValue() !== null){
      this.productosAComprar.push(product);
      this.calcularTotal();
    }else{
      Swal.fire({
        title: '¡Es necesario iniciar sesión!',
        text: "Usted debe iniciar sesión para poder realizar compras en la plataforma",
        html: "¿Desea dirigirse a Login?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vamos!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login'])
        }
      })
    }
  }

  calcularTotal(){
    this.precioTotal = 0;
    this.productosAComprar.forEach(item => {
      this.precioTotal += item.amount 
    })
    this.quantity = 1;
  }

  limpiar(){
    this.productosAComprar = []
  }

  eliminarDelCarrito(id: number, precio:number){
    for (let i= 0; i<this.productosAComprar.length;i++) {
      if (this.productosAComprar[i].id === id) {
        this.productosAComprar.splice(i,1);
        this.precioTotal = this.precioTotal - precio;
        break;
      }
    }
  }

  enviarCompra(){
   
      let pedido = [this.productosAComprar, this.precioTotal];
      const dialogRef: MatDialogRef<any> = this.dialog.open(ConfirmacionCompraComponent, {
        width: '1000px',
        height: '800px',
        disableClose: true,
        data: pedido,
      });
      dialogRef.afterClosed().subscribe(res => {
          if (!res) {
            this.limpiar()
          }
      })
    
  }

}
