import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { Registro } from './Registro/Registro';
import { Login } from './Login/Login';
import { Entradas } from './Entradas/Entradas';
import { Perfil } from './Perfil/Perfil';
import { NuevaEntrada } from './nuevEnt/nuevEnt';
import { Contactos } from './Contactos/Contactos';
import { Buzon } from './BuzonEnt/BuzonEnt';
import { Home } from './Home/Home';





const routes: Routes = [{path:"Registro",component:Registro},
{path:"Login",component:Login},{path:"Entradas",component:Entradas},
{path:"Perfil",component:Perfil},{path:"NuevaEntrada",component:NuevaEntrada},
{path:"Contactos/:identificador",component:Contactos},
{path:"BuzonEnt/:tipoUsuario/:contacto",component:Buzon},
{path:"Login/:MensajeLogin",component:Login},
{path:"",component:Home}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
