import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  vivero: string
  user: gapi.auth2.GoogleUser
  hide= true

  formLogin: FormGroup = new FormGroup({
    email: new FormControl(['', [Validators.required, Validators.email]]),
    password: new FormControl(['', [Validators.required]]),
  });

  constructor(
    private singInService: AuthService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.singInService.observable().subscribe(user => {
      this.user = user;
      this.ref.detectChanges()
    })
  }

  loginSocial() {
    this.singInService.singin();
  }

  public login() {
    this.singInService.login(this.formLogin.get('email').value, this.formLogin.get('password').value).
      subscribe(
        success => {
          this.router.navigate(['']);
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Datos incorrectos...',
            text: 'Revise sus credenciales y vuelta a intentarlo nuevamente',
            backdrop: `
            rgba(0,0,0,0.4)
          `
          })
        });

  }

  goToRegister() {
    this.router.navigate(['register'])
  }

  goToTienda(){
    this.router.navigate([''])
  }
}
