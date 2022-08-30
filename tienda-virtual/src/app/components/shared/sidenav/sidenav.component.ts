import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { constants } from 'buffer';
import { BehaviorSubject, Subject } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import UserLogged from 'src/app/models/userLogged';
import { AuthService } from 'src/app/services/auth.service';
import { MensajeroService } from 'src/app/services/mensajero.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { ContactComponent } from './contact/contact.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isFixedNavbar;
  @HostBinding('class.navbar-opened') navbarOpened = false;
  isTiendaSelected = false;
  hidden = true;
  user: UserLogged
  productos: Producto[] = []

  _productosSelected: Subject<any[]> = new BehaviorSubject(null);

  productosSelected: any[]

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private msj: MensajeroService,
    public singUpService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {

    this.productoService.getProductos().subscribe((productos)=>{
      this.productosSelected = productos
    });

    if (this.singUpService.getUserValue() !== null) {
      this.singUpService.setUserIn(this.singUpService.getToken())
      this.user = this.singUpService.getUserValue()
    }else{
      this.user = null
    }


    this.msj.getMsj().subscribe(noti => {
      this.hidden = false;
    })

  }

  toggleBadgeVisibility() {
    this.hidden = true;
  }

  close() {
    this.sidenav.close();
  }

  logout() {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta a punto de salir de la tienda",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.singUpService.logout()
        localStorage.clear()
      }
    })
  }

  login() {
    this.router.navigate(['login'])
  }

  changePassword() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(UpdatePasswordComponent, {
      width: '700px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return
      }
    })
  }

  verDatosContacto() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ContactComponent, {
      width: '1000px',
      disableClose: true,
      data: localStorage.getItem("tienda")
    });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return
      }
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }

}
