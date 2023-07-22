import { Component } from "@angular/core";
import { ServicioFirebase } from "../servicios/servicioFirebase";
import firebase from "firebase/compat/app";

@Component({
    selector:"AppLogin",
    templateUrl:"Login.html",
    styleUrls:["login.css"]
})

export class Login{

    tokenLogin="";
    email="";
    contrasegna="";

    constructor(private servicioFirebase:ServicioFirebase){}

    loginUsuario(){
        if(this.email.length<5||this.contrasegna.length<5){
            alert("Revise los datos aportados");
            this.email="";
            this.contrasegna="";
        }else{
            
            let valor=this.servicioFirebase.login(this.email,this.contrasegna);
            valor.catch(onrejectionhandled=>{alert("No existen usuarios con los datos especificados");});
            this.email="";
            this.contrasegna="";  
        }
        
    }

    getToken(){
        return this.servicioFirebase.getCookieToken();
    }
}