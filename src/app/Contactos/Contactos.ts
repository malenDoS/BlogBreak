import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServicioFirebase } from "../servicios/servicioFirebase";
import { Entrada } from "../Entrada";
import { Comentario } from "../Comentario";
import { HttpContext } from "@angular/common/http";

@Component({
    selector:"Contactos",
    templateUrl:"Contactos.html",
    styleUrls:["Contactos.css"]
})
export class Contactos{

    codigoUsuario="";
    entradas: Entrada[]=[];
    array: Object[][]=[][3];
    entradaSel:number=-1;
    arrayCom:Object[]=[];
    comentarios:Comentario[]=[];
    condicionUrl:Boolean=false;
    numeroEnt:number=0;
    numeroPaginas=0;
    paginaSeleccionada=1;
    imagen:string="";

    constructor(private rutas:ActivatedRoute,private fb:ServicioFirebase,private paginas:Router){}
    ngOnInit(){
        this.entradaSel=-1;
        this.getDatosURL();
        //Busco las entradas del usuario
        let datos=this.fb.datosContacto(this.codigoUsuario);
        datos.subscribe(
            response=>{
                this.entradas=[];
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
        );
        
    }

    

    seleccionaPagina(numero:number){
        this.paginaSeleccionada=numero;

    }
    
    calculaPaginas(){
        
        let nEntradas=this.entradas.length;
        if(nEntradas<5){
            this.numeroPaginas=0;
        }else{

            this.numeroPaginas=(Math.ceil(nEntradas/5)-1);
        }
    }

    getDatosURL(){
        if(this.condicionUrl==false){
        //Rescato los datos pasados por la url.
        this.codigoUsuario=this.rutas.snapshot.params["identificador"];
        }
    }

  cerrarEntrada(){
    this.entradaSel=-1;
  }

    seleccionEnt(numero:number){
        this.comentarios=[];
        this.entradaSel=numero;
        this.getComentarios(this.entradas[this.entradaSel].getKey(),this.fb.codigoCliente());
    }

    getComentarios(codEntrada:string,codUsuario:string){
        this.fb.getComent(codEntrada,codUsuario).subscribe(
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

    comentaEntrada(comentario:string,){
        let comRepetido=false;
        for(let i=0;i<this.comentarios.length;i++){
            if(this.comentarios[i].getComentario()==comentario){
                comRepetido=true;
            }
        }
        if(comentario.length==0){
            alert("Rellena el campo de texto");
        }else if(comRepetido){
            alert("Comentario repetido, revise el contenido");
        }else{
        this.fb.comentarioEnt(comentario,this.codigoUsuario,this.entradas[this.entradaSel].getKey());
        this.entradaSel=-1;
        }
    }
    
    usuarioCom(usuarioCom:string){
        if(usuarioCom==this.fb.codigoCliente()){
            this.paginas.navigate(["Perfil"]);
        }else{
            this.codigoUsuario=usuarioCom;
            this.paginas.navigate(["Contactos",usuarioCom]);
            this.condicionUrl=true;
            this.ngOnInit();
        }
    }

    
    
    

}