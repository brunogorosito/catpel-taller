import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import { BehaviorSubject, Subject } from 'rxjs';
import UserLogged from 'src/app/models/userLogged';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tienda-virtual',
  templateUrl: './tienda-virtual.component.html',
  styleUrls: ['./tienda-virtual.component.css']
})
export class TiendaVirtualComponent implements OnInit {

  @Input() productosSelected: any[];
  user: UserLogged 
  tienda : string

  constructor(private singUpService: AuthService) { }

  ngOnInit(): void {
      if(this.singUpService.getUserValue !== null ){
        this.singUpService.setUserIn(this.singUpService.getToken())
        this.user = this.singUpService.getUserValue()
      }
    }
  }



