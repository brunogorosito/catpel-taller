import { DOCUMENT } from '@angular/common';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { ItemCarrito } from 'src/app/models/item-carrito';
import { Address, City, IvaCondition, Pedido, Province, User } from 'src/app/models/pedido';
import { AuthService } from 'src/app/services/auth.service';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.css']
})
export class ConfirmacionCompraComponent implements OnInit {

  isLinear = false;
  token : any;
  
  firstFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  thirdParty:FormGroup;

  cuotas : any[] = [];
  tiposDeDocumentos : any[] = [];
  condicionesFrenteAlIVA : any[] = [];
  provincias: any[] = [];
  ciudades: any[] = [];
  codigoPostal : string;
  metodosDePago : any[] = [];
  digitosTarjeta : string;

  seleccionTarjeta = false;
  seleccionTicket = false;
  metodoElegido = null;
  planElegido = null;
  conditions = null;
  sonIguales = true;

  precioTotal = this.data[1];
  productos : ItemCarrito[] = this.data[0];

  options: FormGroup;
  floatLabelControl = new FormControl('true');

  documento : string;
  cuit : string;
  tipoDocumento : string;
  idProfile: string
  codSeg : string;
  mes: number;
  anio: number;
  
  titular: string;
  payer: User;

  cuitTercero: string;
  nombreTercero: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmacionCompraComponent>,
    private _formBuilder: FormBuilder,
    private personaService: PersonaService,
    private authService: AuthService) {
      this.options = _formBuilder.group({
        floatLabel: this.floatLabelControl,
      });
    }

    ngOnInit() {

    this.personaService.getTiposDeDocumentos().subscribe((tiposDoc: any[]) => {
      this.tiposDeDocumentos = tiposDoc;
    }) 

    this.personaService.getCondicionesFrenteAlIVA().subscribe((tiposCondiciones: any[]) => {
      this.condicionesFrenteAlIVA = tiposCondiciones;
    })

    this.personaService.getProvinces().subscribe((provinces : any[]) =>{
      this.provincias = provinces;
    })

    this.personaService.getMetodosDePago().subscribe((methods : any[]) =>{
       this.metodosDePago = methods;
    })

    this.firstFormGroup = this._formBuilder.group({
      ivaCondition: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      ciudad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      calle: ['', [Validators.required, Validators.pattern(/[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]],
      numero: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      piso: ['',[]],
      dpto: ['',[]],
    });

   this.thirdParty = this._formBuilder.group({
      cuitTercero: ['', Validators.required ],
      nombreTercero: ['', Validators.required],
   });

    this.thirdFormGroup = this._formBuilder.group({
      methodCtrl: ['', Validators.required],
      numTarjCtrl: ['', [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.minLength(16),Validators.maxLength(16)]],
      codSegCtrl: ['', [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(3)]],
      mesExpCtrl: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      yearExpCtrl: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      nomTitCtrl: ['', Validators.required],
      planCtrl: ['', Validators.required],
    });

/*     this.personaService.getMe(this.authService.getUserValue().id).subscribe((res) =>{
      this.idProfile = res.id
      this.agregarCiudades(res.address.city.province.id)
      this.rellenarFormulario(res)
    }) */
    
  }

  rellenarFormulario(res : any){
    this.firstFormGroup.patchValue({
      ivaCondition: null,
      telefono: res.phone,
      provincia : res.address.city.province,
      ciudad: res.address.city,
      calle: res.address.street,
      numero: res.address.number,
      piso: res.address.floor,
      dpto: res.address.dpto,
    })
    this.documento = res.document
    this.cuit = res.cuilCuit
    this.tipoDocumento = res.documentType
  }

  backClicked() {
    this.dialogRef.close();
  }

  datosFacturacion(event: boolean) {
    this.sonIguales = event;
  }

  agregarTipoDocumento(tipo){
    this.tipoDocumento = tipo.value;
  }

  comparaProvincias(provincie1: Province, province2: Province): boolean {
    return provincie1 && province2 ? provincie1.id === province2.id : province2 === provincie1;
  }

  comparaCiudades(cuidad1: City, ciudad2: City): boolean {
    return cuidad1 && ciudad2 ? cuidad1.id === ciudad2.id : ciudad2 === cuidad1;
  }

  agregarCiudades(id: string) {
    this.personaService.getCitiesByProvince(id).subscribe((cities: any[]) => {
      this.ciudades = cities;
    })
  }

  agregarDatos(metodo){
    this.personaService.getMethodById(metodo.value).subscribe((method : any) =>{
      this.metodoElegido = method;
      if(this.metodoElegido.idMercadoPago === "pagofacil" || this.metodoElegido.idMercadoPago === "rapipago"){
        this.seleccionTicket = true;
      }else{
        this.seleccionTarjeta = true;
      }
    }) 
  }

  public onKey(event: KeyboardEvent): void {
    this.digitosTarjeta = (event.target as HTMLInputElement).value
    if(this.digitosTarjeta.length === 6){
      this.visualizarCuotas()
    } 
  }

  visualizarCuotas(){
    let bin = this.digitosTarjeta.substring(0,6);
    this.personaService.getCuotas(this.precioTotal,bin,this.metodoElegido.idMercadoPago).subscribe((installments: any) => {
      this.cuotas = installments[0].payerCosts;
    })

  }

  selectionPlan(plan){
      this.planElegido = this.cuotas.filter(x => x.installments === plan.value );
      this.precioTotal = this.planElegido[0].totalAmount;
      this.conditions = this.planElegido[0].labels[1];
  }

  generarToken(){
    this.personaService.createToken(this.digitosTarjeta,this.codSeg,this.anio,this.mes,this.tipoDocumento,this.documento,this.titular).subscribe((token : any) =>{
      this.token = token.id
      if(this.token !== null){
        this.generarPago();
      } 
    }) 
  }

  tieneImagen(id: number){
    const producto : ItemCarrito = this.productos.find(element => element.saleDTO.id === id);
    if(producto.saleDTO.image !== null){
      return true
    }
    return false;
  }
  
  asignarDatos(){
   /*  if(this.sonIguales){
      this.payer = new User(null,
        this.authService.getUserValue().firstName,
        this.authService.getUserValue().lastName,
        this.authService.getUserValue().email, 
        this.cuit, 
        new Address(
          this.firstFormGroup.get('calle').value,
          this.firstFormGroup.get('numero').value,
          this.firstFormGroup.get('piso').value,
          this.firstFormGroup.get('dpto').value,
          this.firstFormGroup.get('ciudad').value),
          this.documento,
          this.tipoDocumento,
          this.firstFormGroup.get('ivaCondition').value,
          this.firstFormGroup.get('telefono').value, null, true, null); 
    } else{
      this.payer = new User(null,
        this.authService.getUserValue().firstName,
        this.authService.getUserValue().lastName,
        this.authService.getUserValue().email, 
        this.cuit, 
        new Address(
          this.firstFormGroup.get('calle').value,
          this.firstFormGroup.get('numero').value,
          this.firstFormGroup.get('piso').value,
          this.firstFormGroup.get('dpto').value,
          this.firstFormGroup.get('ciudad').value),
          this.documento,
          this.tipoDocumento,
          this.firstFormGroup.get('ivaCondition').value,
          this.firstFormGroup.get('telefono').value, 
          this.thirdParty.get('cuitTercero').value, false, 
          this.thirdParty.get('nombreTercero').value); 
    }  */
  }

  generarPago(){
    let timerInterval;
    let pedido = new Pedido(null,null,this.precioTotal,this.productos.length,null,this.payer)
    let installmentsId = this.planElegido[0].installments;
    let paymentMethodId = this.metodoElegido.idMercadoPago;
    Swal.fire({
      title: '¿Está seguro que desea realizar el pago?',
      text: "Esta acción no podrá revertirse",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, adelante!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.createPago(installmentsId,this.productos, pedido, paymentMethodId,this.token).subscribe((response) =>{
          Swal.fire({
            title: 'Estamos procesando tu pago...',
            html: 'Aguarde unos minutos',
            timer: 7000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then(() => {
              if(response.code === 2){
                this.pagoPorTicket(response.message);
              }else{
                if(response.code === 1){
                  let status = response.shoppingCartDTO.payment.state;
                  switch (status) {
                    case 'approved':
                        this.pagoAprobado(response.shoppingCartDTO.payment.idMercadoPago,
                          response.shoppingCartDTO.payment.amount);
                        break;
                    case 'in_process':
                        this.pagoPendiente();
                        break;
                    case 'rejected':
                        this.pagoCancelado();
                        break;
                  }
                }else{
                  if(response.code === 4){
                    this.errorConcurrencia();
                  }else{
                    this.errorGenerico()
                  }
                }
              }
              this.dialogRef.close();
            })  
        })
      }
    })  
  }

  generarTicket(){
    let paymentMethodId = this.metodoElegido.idMercadoPago;
    let pedido = new Pedido(null,null,this.precioTotal,this.productos.length,null,this.payer)
    this.personaService.createPago(null,this.productos, pedido, paymentMethodId,null).subscribe((response) =>{
      this.pagoPorTicket(response.message);
    })
  }

  pagoAprobado(codigo: string, amount: string){
    Swal.fire({
      icon: 'success',
      title: 'Listo, se acreditó tu pago',
      text: 'Comprobante N° '+codigo,
      footer: 'En tu resumen verás el cargo de $' + amount,
      showConfirmButton: true,
      backdrop: `
        rgba(0,0,0,0.4)
      `
    })
  }

  pagoPendiente(){
    Swal.fire({
      icon: 'warning',
      title: '¡Ya casi es tuyo! '+
      'Estamos procesando tu pago...',
      text: 'No te preocupes',
      footer: 'En menos de 2 días hábiles te avisaremos por email si se acreditó.',
      backdrop: `
        rgba(0,0,0,0.4)
      `
    })
  }

  pagoCancelado(){
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal...' + 
      'Tu tarjeta no procesó el pago',
      text: '¿Que puedo hacer?' +
      ' Usa otra tarjeta o vuelva a intentarlo',
      backdrop: `
        rgba(0,0,0,0.4)
      `
    })
  }

  pagoPorTicket(redirect : string){
    let timer
    Swal.fire({
      title: 'Serás redirigido al ticket...',
      text: 'Aguarde unos minutos.',
      footer: 'Gracias por comprar en nuestro sistema.',
      timer: 5000,
      timerProgressBar: true,
      backdrop: `
        rgba(0,0,0,0.4)
      `,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timer)
      }
    }).then((result) => {
      window.open(redirect, "_blank");
      this.dialogRef.close();
    })
  }

  errorGenerico(){
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal...',
      text: '¡Hubo un error inesperado! ' +
      'Vuelva a intentarlo más tarde',
      footer: 'Si sigue persistiendo el problema, comuniquese con depto.si@unrn.edu.ar',
      backdrop: `
        rgba(0,0,0,0.4)
      `
    })
  }

  errorConcurrencia(){
    Swal.fire({
      icon: 'error',
      title: 'Ya no hay stock...',
      text: 'Hubo un problema con el stock del producto' +
      'Vuelva a intentarlo más tarde.',
      footer: 'Si sigue persistiendo el problema, comuniquese con depto.si@unrn.edu.ar',
      backdrop: `
        rgba(0,0,0,0.4)
      `
    })
  }

  update(){
/*     let address: Address = new Address(this.firstFormGroup.get('calle').value, this.firstFormGroup.get('numero').value, this.firstFormGroup.get('piso').value,
        this.firstFormGroup.get('dpto').value, this.firstFormGroup.get('ciudad').value);
      let profile = {
        id: this.idProfile,
        address: address, 
        document:this.documento, 
        cuilCuit:this.cuit,
        documentType:  this.tipoDocumento,
        ivaCondition: this.firstFormGroup.get('ivaCondition').value, 
        phone: this.firstFormGroup.get('telefono').value}
      this.personaService.updateData(
        this.authService.getUserValue().id,
        this.authService.getUserValue().lastName,
        this.authService.getUserValue().email,
        this.authService.getUserValue().firstName,
        '', profile).subscribe(
          success => {
            Swal.fire({
              icon: 'success',
              title: '¡Usuario actualizado!',
              text: 'Se actualizó su usuario correctamente',
              showConfirmButton: true,
              backdrop: `
                rgba(0,0,0,0.4)
              `
            })
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Datos incorrectos...',
              text: '',
              backdrop: `
            rgba(0,0,0,0.4)
          `
            })
          });
  } */

  }
}
