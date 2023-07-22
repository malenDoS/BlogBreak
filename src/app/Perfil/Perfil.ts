import{Component}from"@angular/core"
import { ServicioFirebase } from "../servicios/servicioFirebase";
import { Entrada } from "../Entrada";
import { Router } from "@angular/router";
import { Comentario } from "../Comentario";
import { Usuario } from "../Usuario";
@Component({
    selector:"perfil",
    templateUrl:"Perfil.html",
    styleUrls:["Perfil.css"]

})
export class Perfil{

    email="";
    entradas:Entrada[]=[];
    array:Object[][]=[][3];
    entradaSel:number=-1;
    arrayCom:Object[]=[];
    comentarios:Comentario[]=[];
    entradasVista:Entrada[]=[];
    numeroPaginas=0;
    paginaSeleccionada=1;
    constructor(private servicioFB:ServicioFirebase,private rutas:Router){}
    
    
    ngOnInit(){
        this.email=this.servicioFB.getEmailUsuario();
        this.servicioFB.datosEntradas().subscribe(
            response=>{
                this.entradas=[];
                this.array=[];
                this.array=Array.from(Object.values(response));
                for(let i=0;i<this.array.length;i++){
                    let infoEntradas=Array.from((Object.values(this.array[i].valueOf())));
                    for(let j=0;j<2;j++){
                        let nuevaEntrada=new Entrada(infoEntradas[j+2],infoEntradas[j],infoEntradas[j+1]);
                        this.entradas.push(nuevaEntrada);
                        j=j+1;
                    }
                }
                this.calculaPaginas();
            }
        )

        
        
    }

    seleccionaPagina(numero:number){
        this.paginaSeleccionada=numero;
    }
    calculaPaginas(){
        let nEntradas=this.entradas.length;
        if(nEntradas<5){
            this.numeroPaginas=0;
        }else{

            this.numeroPaginas=(Math.ceil(nEntradas/5)+1);
        }
     
        

    }

    
    seleccionEnt(numero:number){
        this.comentarios=[];
        this.entradaSel=numero;
        this.getComentarios(this.entradas[this.entradaSel].getKey(),this.servicioFB.codigoCliente());
    }


    getComentarios(codEntrada:string,codUsuario:string){
        this.servicioFB.getComent(codEntrada,codUsuario).subscribe(
            response=>{
                this.arrayCom=Object.values(response);
                let entradaCom=[];
                for(let i=0;i<this.arrayCom.length;i++){
                    entradaCom.push((Object.values(this.arrayCom[i].valueOf())));
                    for(let j=0;j<entradaCom[0].length;j++){
                        this.comentarios.push(new Comentario(entradaCom[i][j+1],entradaCom[i][j],entradaCom[i][j+2]));
                        j=j+2;
                    }
                }
            }
        );
        
    }
        

    borrarEnt(key:string){
        this.servicioFB.borraEnt(key);
        //Borro los comentarios
        let comentEntrada=this.getComentarios(key,this.servicioFB.codigoCliente());
        this.getComentarios(key,this.servicioFB.codigoCliente());
        for(let comentario of this.comentarios){
            this.servicioFB.borraCom(comentario,key);
        }
        this.rutas.navigate(["Entradas"]);
    }

    borraComentario(comentario:Comentario,clave:string){
        this.servicioFB.borraCom(comentario,clave);
        this.entradaSel=-1;
    }

    usuarioCom(usuarioCom:string){
        if(usuarioCom==this.servicioFB.codigoCliente()){
            this.rutas.navigate(["Perfil"]);
        }else{
            this.entradaSel=-1;
            this.rutas.navigate(["Contactos",usuarioCom]);
        }
    }

    cerrarMensaje(){
        this.entradaSel=-1;
    }

}