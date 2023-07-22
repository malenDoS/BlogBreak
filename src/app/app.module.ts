import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Registro } from './Registro/Registro';
import { ServicioFirebase } from './servicios/servicioFirebase';
import{HttpClient, HttpClientModule}from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Login } from './Login/Login';
import { Usuario } from './Usuario';
import { Entradas } from './Entradas/Entradas';
import { Perfil } from './Perfil/Perfil';
import { NuevaEntrada } from './nuevEnt/nuevEnt';
import { Contactos } from './Contactos/Contactos';
import { Buzon } from './BuzonEnt/BuzonEnt';
import { Respuesta } from './Respuesta';
import { Home } from './Home/Home';



@NgModule({
  declarations: [
    AppComponent,Registro,Login,Entradas,Perfil,NuevaEntrada,Contactos,Buzon,Home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [ServicioFirebase,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
