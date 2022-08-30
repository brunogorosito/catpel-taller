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

  plantinesAComprar : ItemCarrito[] = [];
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
    this.msj.getMsj().subscribe((product: Producto) => {
      this.addPlantinToCart(product);
    })
    this.cantidades = this._formBuilder.group({
      quantity: ['', [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.min(1)]]
    });
  }

  addPlantinToCart(product: Producto) {
    if(this.authService.getUserValue() !== null){
      
      let productExists = false
      let itemCarrito = null;
      let idProducto: number = product.id
      
      for (let i in this.plantinesAComprar) {
        if (this.plantinesAComprar[i].saleDTO.id === idProducto) {
          this.aumentarCantidad(this.plantinesAComprar[i].saleDTO.id,this.plantinesAComprar[i].quantity)
          productExists = true
          this.calcularTotal();
          break;
        }
      }
  
      if (!productExists) {
        this.productoService.getStockPlantin(idProducto).subscribe((stock: number) => {
            this.stockPlantin = stock;
            itemCarrito =  new ItemCarrito(idProducto, product, product.price, this.quantity, this.stockPlantin);
            this.plantinesAComprar.push(itemCarrito);
            this.calcularTotal();
        }) 
      }
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
    this.plantinesAComprar.forEach(item => {
      this.precioTotal += (item.quantity * item.amount);
    })
    this.quantity = 1;
  }

  limpiar(){
    this.plantinesAComprar = []
  }

  eliminarDelCarrito(id: number, precio:number){
    for (let i= 0; i<this.plantinesAComprar.length;i++) {
      if (this.plantinesAComprar[i].saleDTO.id === id) {
        this.plantinesAComprar.splice(i,1);
        this.precioTotal = this.precioTotal - precio;
        break;
      }
    }
  }

  verificarStock(id: number){
    for (let i= 0; i<this.plantinesAComprar.length;i++) {
      if (this.plantinesAComprar[i].saleDTO.id === id) {
        if(this.quantity > this.plantinesAComprar[i].stock){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text:"No hay suficiente stock disponible!",
            showConfirmButton: false,
            timer: 3500,
            width:"20rem"
          })
          this.quantity = this.plantinesAComprar[i].stock;
        }else{
          this.plantinesAComprar[i].quantity = this.quantity
          this.calcularTotal();
          break;
        }
      }
    }
  }

  aumentarCantidad(id: number , cantidad:number){
    for (let i= 0; i<this.plantinesAComprar.length;i++) {
      if (this.plantinesAComprar[i].saleDTO.id === id) {
        if(cantidad === this.plantinesAComprar[i].stock){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text:"No hay más stock disponible!",
            showConfirmButton: false,
            timer: 2500,
            width:"20rem"
          })
        }else{
          this.plantinesAComprar[i].quantity++
          this.calcularTotal();
          break;
        }
      }
    }
  }

  reducirCantidad(id: number, cantidad:number){
    for (let i= 0; i<this.plantinesAComprar.length;i++) {
      if (this.plantinesAComprar[i].saleDTO.id === id) {
        if(cantidad == 1){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text:"La cantidad no puede ser menor a 1!",
            showConfirmButton: false,
            timer: 2500,
            width:"25rem"
          })
        }else{
          this.plantinesAComprar[i].quantity--
          this.precioTotal = this.precioTotal - this.plantinesAComprar[i].amount;
          break;
        }
      }
    }
  }

  enviarCompra(){
   
      let pedido = [this.plantinesAComprar, this.precioTotal];
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
