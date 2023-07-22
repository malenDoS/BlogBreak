import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { CookieService } from "ngx-cookie-service";
import { Usuario } from "../Usuario";
import { Observable } from "rxjs";
import { Entrada } from "../Entrada";
import { Comentario } from "../Comentario";
import { Respuesta } from "../Respuesta";
import { Mensaje } from "../Mensaje";
import { ReadKeyExpr } from "@angular/compiler";

@Injectable()
export class ServicioFirebase{

    //Variable que recibe el token al loguearse.
    tokenLogin:string="";
    respuestaLoguin:boolean=false;
    
    constructor(private cliente:HttpClient,private rutas:Router,private cookie:CookieService){
    }

    registrarUsuario(email:string,contrasegna:string){
        let usuarioRegistro=new Usuario(email,contrasegna);
        firebase.auth().createUserWithEmailAndPassword(email,contrasegna).then(
           response=>{
        let url="https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Usuarios/"+this.crearId()+".json";
        this.cliente.put(url,usuarioRegistro).subscribe(
            response=>{
                this.login(email,contrasegna);
            }
        );
            
           }
           
        ).then(onload=>{alert("Registrado con éxito")}).catch(onrejectionhandled=>{alert("No se ha podido registrar al usuario");})

        
    }
    

    //Función para loguear a un usuario.
    login(email:string,password:string){
        let valor=firebase.auth().signInWithEmailAndPassword(email,password).then(
            response=>{
                firebase.auth().currentUser?.getIdToken().then(
                    tokenRecibido=>{
                        this.tokenLogin=tokenRecibido;
                        //Guardo en la cookie la información del token.
                        this.cookie.set("tokenLogin",this.tokenLogin);
                        this.cookie.set("emailValidado",email);
                        this.rutas.navigate(["Entradas"]);

                      
                    }
                    
                )
                
            }
            
            
        );
        
        return valor;
        
        
    }

    getCookieToken(){
        return this.cookie.get("tokenLogin");
    }
    getEmailUsuario(){
        return this.cookie.get("emailValidado");
    }

    logoutUsuario(){
        this.cookie.set("tokenLogin","");
        this.cookie.set("emailValidado","");
        this.rutas.navigate(["Login"]);
    }

    datosEntradas(){
    return this.cliente.get("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Entradas/"+this.codigoCliente()+".json")
    }

    nuevaEntrada(titulo:string,contenido:string){
        let idEntrada=this.crearId();
        let entrada=new Entrada(titulo,contenido,idEntrada);
        this.cliente.put("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Entradas/"+this.codigoCliente()+"/"+idEntrada+".json",entrada).subscribe(
            response=>{}
        );
        return true;
    }

    borraEnt(key:string){
        this.cliente.delete("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Entradas/"+this.codigoCliente()+"/"+key+".json").subscribe(
            response=>{alert("Entrada borrada satisfactoriamente");return true},
            onrejectionhandled=>{alert("No se ha podido borrar la entrada")}
        );
        return false;
        
    }

    codigoCliente(){
        let codUsuario=this.getEmailUsuario();
        codUsuario=codUsuario.replace("@gmail.com","");
        codUsuario=codUsuario.replace("@gmail.es","");
        return codUsuario;
    }

    datosContacto(codigo:string){
        return this.cliente.get("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Entradas/"+codigo+".json");
    }
    
    getComent(idEntrada:string,codUsuario:string){
        return this.cliente.get("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Entradas/Comentarios/"+idEntrada+".json");
    }

    comentarioEnt(comentario:string,codigoUsuario:string,codigoEntrada:string){
        let idComentario=this.crearId();
        let comentarioEnt=new Comentario(idComentario,comentario,this.codigoCliente())
        this.cliente.put("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Entradas/Comentarios/"+codigoEntrada+"/"+idComentario+".json",comentarioEnt).subscribe(
            response=>{alert("Comentario añadido")},
            onRejectionHandled=>{
                alert("No se ha podido guardar el comentario");
            }
        );
    }

    borraCom(comentario:Comentario,clave:string){
        this.cliente.delete("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/Entradas/Comentarios/"+clave+"/"+comentario.getIdc()+".json").subscribe(
        response=>{return true;}
        );
    }

    getMensajes(){
        return this.cliente.get("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/BuzonEntrada/"+this.codigoCliente()+".json");
    }
    getMensajesContactos(codigoCon:string){
        return this.cliente.get("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/BuzonEntrada/"+codigoCon+".json");
    }

    //Mensajes de respuesta
    getMensajeR(idMensaje:string){
        return this.cliente.get("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/BuzonEntrada/Respuestas/"+idMensaje+".json");
    }

    borrarMensaje(idMensaje:string,receptor:string){
        this.cliente.delete("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/BuzonEntrada/"+receptor+"/"+idMensaje+".json").subscribe(
            response=>{
                alert("Mensaje borrado");
            }
        );
    }

    escribirMensaje(mensaje:Mensaje){
        this.cliente.put("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/BuzonEntrada/"+mensaje.getReceptor()+"/"+mensaje.getKey()+".json",mensaje).subscribe(
            response=>{
                alert("Mensaje enviado correctamente");
            }
        );
    }
        

    guardaRespuesta(respuesta:Respuesta,idMensaje:string){
        this.cliente.put("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/BuzonEntrada/Respuestas/"+idMensaje+"/"+respuesta.getIdRespuesta()+".json",respuesta).subscribe(
            response=>{
                alert("Respuesta Guardada");
            }
        );
    }

    crearId(){
        let abecedario=["a","b","c","d","e","f","g","h","i","j"];
        let id=[];
        for(let i=0;i<abecedario.length;i++){
            let numero=Math.floor(Math.random()*10);
            id[i]=abecedario[Number(numero)]+Number(numero).toString();
        }
        return id.toString().replace(/,/g,"");
    }

    borraRe(idMensaje:string,idRespuesta:string){
        this.cliente.delete("https://blogbreak-bea3d-default-rtdb.europe-west1.firebasedatabase.app/BuzonEntrada/Respuestas/"+idMensaje+"/"+idRespuesta+".json").subscribe(
            response=>{
                alert("Respuesta eliminada");
            }
        );
    }

    
}







