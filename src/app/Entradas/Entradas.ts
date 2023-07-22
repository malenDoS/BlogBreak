import {Component} from "@angular/core"
import { ServicioFirebase } from "../servicios/servicioFirebase";
import { Router } from "@angular/router";
@Component({
    selector:"Entradas",
    templateUrl:"entradas.html",
    styleUrls:["entradas.css"]
    
})
export class Entradas{
    
    nombreContacto="";

    constructor(private servicioFb:ServicioFirebase,private rutas:Router){}
    
    buscaContactos(){
        if(this.nombreContacto==""||this.nombreContacto.length<5){
            alert("Revise los criterios de búsqueda");
            this.nombreContacto="";
        }else{
        if(this.nombreContacto==this.servicioFb.codigoCliente()){
            this.rutas.navigate(["Perfil"]);
        }else{
            let datos=this.servicioFb.datosContacto(this.nombreContacto);
            datos.subscribe(
                response=>{
                    if(response){
                        this.rutas.navigate(["Contactos",this.nombreContacto]);
                    }else{
                        alert("No existen datos de este usuario");
                        this.nombreContacto="";
                    }
                }
            )
        }
    }
    }
    
    
    

}