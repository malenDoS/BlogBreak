import { Component } from "@angular/core";
import { ServicioFirebase } from "../servicios/servicioFirebase";
import firebase from "firebase/compat/app"
import { Binary } from "@angular/compiler";
import { HttpClient } from "@angular/common/http";

@Component({
    selector:"Registro",
    templateUrl:"registro.html",
    styleUrls:["registro.css"]
})
export class Registro{

    email="";
    contrasegna="";
    tokenLogin="";
    respuesta="";
    constructor(private firebase:ServicioFirebase,private Http:HttpClient){}
    ngOnInit(){
        this.respuesta="";
    }
    
    
    registroUsuario(){
        let validado=false;
        if(this.email.length<=25||this.contrasegna.length>7){
            for(let i=0;i<this.email.length;i++){
                if(this.email.charAt(i)=="@"){
                    validado=true;
                }
            }
            if(validado==true){
                if(this.email.indexOf("gmail")!=-1){
            this.firebase.registrarUsuario(this.email,this.contrasegna);
                }else{
                    alert("Aporte un email de google");
                }
            this.email="";
            this.contrasegna="";
            }else{
                alert("Revise los datos aportados");
                this.email="";
                this.contrasegna="";
            }
        }
        else{
            this.respuesta="Revisa el email";
        }
            
            
        }
    
    getToken(){
        return this.firebase.getCookieToken()
    }

  
}