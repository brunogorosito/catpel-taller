import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class MensajeroService {

  subject = new Subject();

  listaPlantines : Producto[];
  private enviarPlantinesSubject = new Subject<Producto[]>();
  enviarPlantinesObservable = this.enviarPlantinesSubject.asObservable();

  constructor() { }

  enviarMsj(producto){
      this.subject.next(producto); //Dispara el evento para agregar al carrito
  }

  getMsj(){
    return this.subject.asObservable();
  }

  enviarPlantines(plantines : Producto[]){
    this.listaPlantines = plantines
    this.enviarPlantinesSubject.next(plantines)
  }

}
