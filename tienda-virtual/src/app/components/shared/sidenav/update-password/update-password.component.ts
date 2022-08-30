import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import UserLogged from 'src/app/models/userLogged';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  formUpdate: FormGroup;
  hidePassword = true;
  hideRepeatPassword = true;
  hideNewPassword = true;
  user : UserLogged

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UpdatePasswordComponent>,
  private _formBuilder: FormBuilder,
  private singInService: AuthService,
  private router: Router) { }

  ngOnInit(): void {
    this.formUpdate = this._formBuilder.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });

    this.user = this.singInService.getUserValue();
    if(this.singInService.getUserValue !== null ){
      this.singInService.setUserIn(this.singInService.getToken())
      this.user = this.singInService.getUserValue()
    }
  }

  backClicked() {
    this.dialogRef.close();
  }

  update(){
    if(this.formUpdate.get('password').value === this.formUpdate.get('repeatPassword').value){
      this.singInService.updatePassword(this.user.id,
        this.formUpdate.get('newPassword').value,
        this.formUpdate.get('password').value).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: res.title,
              text: res.message,
              showConfirmButton: true,
              backdrop: `
                rgba(0,0,0,0.4)
              `
            }).then(() => this.backClicked())
    
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
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no son iguales',
        backdrop: `
      rgba(0,0,0,0.4)
    `
      })
    }
  }
  
}
