import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TiendaVirtualComponent } from './components/tienda-virtual/tienda-virtual.component';
import { ListaProductosComponent } from './components/tienda-virtual/lista-productos/lista-productos.component';
import { CarritoComponent } from './components/tienda-virtual/carrito/carrito.component';
import { ProductoVentaComponent } from './components/tienda-virtual/lista-productos/producto-venta/producto-venta.component';
import { DetallesComponent } from './components/tienda-virtual/lista-productos/producto-venta/detalles/detalles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmacionCompraComponent } from './components/tienda-virtual/carrito/confirmacion-compra/confirmacion-compra.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './services/authguard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ContactComponent } from './components/shared/sidenav/contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxSpinnerModule } from "ngx-spinner";
import { InterceptorService } from './services/interceptor.service';
import {MatRadioModule} from '@angular/material/radio';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { UpdatePasswordComponent } from './components/shared/sidenav/update-password/update-password.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxStarRatingModule } from 'ngx-star-rating';



const routes: Routes = [
  /* {path: '**', pathMatch: 'full', component: PageNotFoundComponent}, */ 
/*   {path: '', pathMatch: 'full', redirectTo: 'login'}, */
  {path: '', component: SidenavComponent/* , canActivate: [AuthGuard] */},
  {path: 'restorePassword', component: RestorePasswordComponent/* , canActivate: [AuthGuard] */},
  {path: 'register', component: RegisterComponent/* , canActivate: [AuthGuard] */},
  {path: 'login', component: LoginComponent/* , canActivate: [AuthGuard] */}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TiendaVirtualComponent,
    ListaProductosComponent,
    CarritoComponent,
    ProductoVentaComponent,
    DetallesComponent,
    ConfirmacionCompraComponent,
    SidenavComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ContactComponent,
    RestorePasswordComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    RouterModule, 
    MatListModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule, 
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule, 
    FontAwesomeModule,
    MatSnackBarModule,
    NgbModule,
    MatSlideToggleModule,
    NgxSpinnerModule,
    MatRadioModule,
    NgxCaptchaModule,
    MatProgressBarModule,
    NgxStarRatingModule
  ],
  providers: [{ provide: Window, useValue: window},
     {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
