import { Component } from '@angular/core';
import firebase from "firebase/compat/app"
import { ServicioFirebase } from './servicios/servicioFirebase';

@Component({
  selector: 'BarraNav',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogBreak';
  constructor(private servicioFirebase:ServicioFirebase){}
  ngOnInit(){
    //Inicio Firebase en el proyecto.
    firebase.initializeApp({
      //Aporto la clave del proyecto y el dominio en firebase.
      apiKey: "AIzaSyBGektvRSYy_1oF2oyRiZ1-YJ2-WMC3w_c",
      authDomain: "blogbreak-bea3d.firebaseapp.com",
    });
  }

    loginlogout(){
      return this.servicioFirebase.getCookieToken();
    }

    logoutUsuario(){
      this.servicioFirebase.logoutUsuario();
    }
}
