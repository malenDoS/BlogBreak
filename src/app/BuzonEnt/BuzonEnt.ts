import {Component} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServicioFirebase } from "../servicios/servicioFirebase";
import { Mensaje } from "../Mensaje";
import { Respuesta } from "../Respuesta";
import { Observable, delay } from "rxjs";
@Component({
    selector:"BuzonEnt",
    templateUrl:"BuzonEnt.html",
    styleUrls:["BuzonEnt.css"]
})
export class Buzon{
    arrayMensaje:Object[][]=[][5];
    arrayRespuesta:Object[][]=[][4];
    respuestas:Respuesta[]=[];
    mensajes:Mensaje[]=[];
    codigoUsuario="";
    mensajeSel:number=-1;
    verRespuesta=false;
    tipoVisita="";
    escribirMen=false;
    codigoContacto="";
    numeroPaginas=0;
    paginaSeleccionada=1;

    constructor(private fb:ServicioFirebase,private rutas:ActivatedRoute,private nav:Router){
        this.codigoUsuario=fb.codigoCliente();
    }

    ngOnInit(){
        if(this.fb.getCookieToken()==""){
            this.nav.navigate(['']);
        }
        this.getTipoVisita();
        let datosMensaje=this.fb.getMensajes();
        if(this.tipoVisita=="Contacto"){
            datosMensaje=this.fb.getMensajesContactos(this.codigoContacto);
        }
        datosMensaje.subscribe(
            response=>{
                this.arrayMensaje=Array.from(Object.values(response));
                for(let i=0;i<this.arrayMensaje.length;i++){
                    let mensajes=Array.from((Object.values(this.arrayMensaje[i].valueOf())));
                    for(let j=0;j<4;j++){
                        let nuevoMensaje=new Mensaje(mensajes[j+3],mensajes[j+1],mensajes[j+2],mensajes[j+4],mensajes[j]);
                        if(this.tipoVisita=="Perfil"){
                        this.mensajes.push(nuevoMensaje);
                        }else if(this.tipoVisita=="Contacto"){
                            if(nuevoMensaje.getEmisor()==this.fb.codigoCliente()){
                                this.mensajes.push(nuevoMensaje);
                            }
                        }
                        j=j+3;
                    }
                }
                this.calculoPaginas();
            }
        );

    }


    calculoPaginas(){

        let nMensajes=this.mensajes.length;
        if(nMensajes<5){
            this.numeroPaginas=0;
        }else if(nMensajes>5){
            this.numeroPaginas=(Math.ceil(nMensajes/5)+1);
        }
    }

    seleccionaPagina(numeroP:number){
        this.paginaSeleccionada=numeroP+1;
    }
    getTipoVisita(){
        this.tipoVisita=this.rutas.snapshot.params["tipoUsuario"];
        this.codigoContacto=this.rutas.snapshot.params["contacto"];
    }

    seleccionMensaje(nMens:number){
        this.mensajeSel=nMens;
        this.verRespuesta=false;
    }
    getLeerMensaje(){
        let entradaLeer=this.mensajes[this.mensajeSel];
        return entradaLeer;
    }

    borrarMensaje(){
        let mensaje=this.getLeerMensaje();
        this.fb.borrarMensaje(mensaje.getKey(),mensaje.getReceptor());
        //Borro las respuestas
        this.verRespuesta=true;
        this.getRespuestas(mensaje.getKey());
        alert(this.respuestas.length);
        for(let respuesta of this.respuestas){
            this.borraRe(respuesta.getIdRespuesta());
        }
        this.mensajeSel=-1;
        if(this.tipoVisita=="Contacto"){
            this.nav.navigate(["/Contactos/"+this.codigoContacto]);
        }else if(this.tipoVisita=="Perfil"){
            this.nav.navigate(["/Perfil"]);
        }
    }

   getRespuestas(idMensaje:string){
        this.respuestas=[];
        this.fb.getMensajeR(idMensaje).subscribe(
         response=>{
                this.arrayRespuesta=Array.from(Object.values(response));
                for(let i=0;i<this.arrayRespuesta.length;i++){
                    let respuesta=Array.from(Object.values(this.arrayRespuesta[i].valueOf()));
                    for(let j=0;j<3;j++){
                        this.respuestas.push(new Respuesta(respuesta[j],respuesta[j+1],respuesta[j+2],respuesta[j+3]));
                        j=j+2;
                    }
                }
            }
        );
    }

    activaRespuesta(idMensaje:string){
        this.verRespuesta=true;
        this.getRespuestas(idMensaje);
    }

    guardarRespuesta(contenido:string){
        if(contenido.length==0){
            alert("Rellane los campos de texto");
        }else{
        let respuesta=new Respuesta(contenido,this.fb.codigoCliente(),this.fb.crearId(),this.getLeerMensaje().getReceptor());
        this.fb.guardaRespuesta(respuesta,this.getLeerMensaje().getKey());
        this.verRespuesta=false;
        this.mensajeSel=-1;
        }
    }

    escribirMensaje(){
        this.escribirMen=true;
    }

    nuevoMensaje(textoMen:string,asunto:string){
        let mensaje=new Mensaje(this.fb.crearId(),textoMen,this.fb.codigoCliente(),this.codigoContacto,asunto)
        this.fb.escribirMensaje(mensaje);
        this.escribirMen=false;
        this.nav.navigate(["/Contactos",this.codigoContacto]);
    }

    visitaContacto(emisor:string){
        if(emisor==this.fb.codigoCliente()){
            this.nav.navigate(["/Perfil"]);
        }else{
            this.nav.navigate(["/Contactos",emisor]);
        }
    }

    borraRe(idRespuesta:string){
        this.fb.borraRe(this.getLeerMensaje().getKey(),idRespuesta);
        this.mensajeSel=-1;
        this.verRespuesta=false;
        if(this.tipoVisita=="Contacto"){
            this.nav.navigate(["/Contactos/"+this.codigoContacto]);
        }else if(this.tipoVisita=="Perfil"){
            this.nav.navigate(["/Perfil"]);
        }
    }

    cerrarMensaje(){
        this.verRespuesta=false;
        this.mensajeSel=-1;
    }

    cerrarNueMensaje(){
        this.escribirMen=false;
    }

    cerrarRespuesta(){
        this.verRespuesta=false;
    }
}