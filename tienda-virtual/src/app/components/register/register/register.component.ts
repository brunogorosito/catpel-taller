import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { profile } from 'console';
import { Address, City, IvaCondition, Province, User } from 'src/app/models/pedido';
import { AuthService } from 'src/app/services/auth.service';
import { PersonaService } from 'src/app/services/persona.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
import { ErrorStateMatcher } from '@angular/material/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  provincias: any[] = [];
  ciudades: any[] = [];
  condicionesFrenteAlIVA: any[] = [];
  hidePassword = true;
  hideRepeatPassword = true;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  repeat_password: string;
  cuit: number;
  telefono: number;
  provincia: Province
  ciudad: City;
  calle: string;
  numero: number;
  piso: number;
  dpto: string;

  formRegister: FormGroup;

  tiposDeDocumentos: any[] = [];
  tipoDocumento: any;

  siteKey: string = "6LeM8k0fAAAAABxKjJbXpxIH7JTl88U96V1K38ex"

  constructor(private personaService: PersonaService,
    private _formBuilder: FormBuilder,
    private singUpService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.personaService.getTiposDeDocumentos().subscribe((tiposDoc: any[]) => {
      this.tiposDeDocumentos = tiposDoc;
    })

    this.personaService.getCondicionesFrenteAlIVA().subscribe((tiposCondiciones: any[]) => {
      this.condicionesFrenteAlIVA = tiposCondiciones;
    })

    this.personaService.getProvinces().subscribe((provinces: any[]) => {
      this.provincias = provinces;
    })

    this.formRegister = this._formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]],
      apellido: ['', [Validators.required,Validators.pattern(/[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeat_password: ['', Validators.required],
      documento: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      cuit: ['', [Validators.required,  Validators.pattern(/^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g) ]],
      calle: ['', [Validators.required, Validators.pattern(/[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]],
      numero: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      piso: [''],
      dpto: [''],
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      tipoDocCtrl:['', Validators.required],
      recaptcha: ['', Validators.required]
    })

  }

  agregarTipoDocumento(tipo) {
    this.tipoDocumento = tipo.value;
  }

  agregarCiudades(provinciaSelect) {
    this.personaService.getProvinceById(provinciaSelect.value).subscribe((prov: any) => {
      let provincia = new Province(prov.id,prov.name);
      this.provincia = provincia;
      this.personaService.getCitiesByProvince(this.provincia.id).subscribe((cities: any[]) => {
        this.ciudades = cities;
      })
    })
  }

  agregarCodigoPostal(ciudadSelect) {
    let ciudad = new City();
    this.personaService.getCitiById(ciudadSelect.value).subscribe((city: any) => {
      ciudad.id = city.id;
      ciudad.name = city.name;
      ciudad.provinceDTO = this.provincia;
      ciudad.zipCode = city.zipCode;
      this.ciudad = ciudad;
    })
  }

  selectKeyPress(event) {
    this.ciudades.filter(name => name[0] = (event.key));
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  register() {
    if (this.password === this.repeat_password) {
      let address: Address = new Address(this.formRegister.get('calle').value, this.formRegister.get('numero').value, this.formRegister.get('piso').value,
        this.formRegister.get('dpto').value, this.ciudad);
      let profile = {
        id:null,
        address: address, 
        document:this.formRegister.get('documento').value, 
        cuilCuit:this.formRegister.get('cuit').value,
        documentType:this.tipoDocumento,
        ivaCondition: null, 
        phone:this.formRegister.get('telefono').value}
      this.singUpService.register(
        this.formRegister.get('apellido').value,
        this.formRegister.get('email').value,
        this.formRegister.get('nombre').value,
        this.formRegister.get('password').value, profile).subscribe(
          (success) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado!',
              text: 'Se enviará un email con las credenciales ingresadas',
              showConfirmButton: true,
              backdrop: `
                rgba(0,0,0,0.4)
              `
            }).then(() => this.router.navigate(['login']))

          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Datos incorrectos...',
              text: error.error.message,
              backdrop: `
            rgba(0,0,0,0.4)
          `
            })
          });
    }
  }


}
