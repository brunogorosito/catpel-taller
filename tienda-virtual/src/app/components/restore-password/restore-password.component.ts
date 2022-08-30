import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  formRestore: FormGroup

  constructor(
    private singInService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formRestore = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public restore() {
    this.singInService.restorePassword(this.formRestore.get('email').value).subscribe( res =>
       {
        Swal.fire({
          icon: 'success',
          title: res.title,
          text: res.message,
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

  goToLogin(){
    this.router.navigate(['login'])
  }
}