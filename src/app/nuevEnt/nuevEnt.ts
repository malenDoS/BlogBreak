import{Component} from "@angular/core"
import { ServicioFirebase } from "../servicios/servicioFirebase";
@Component({
    selector:"nuevaEntrada",
    templateUrl:"nuevaEntrada.html",
    styleUrls:["nuevaEntrada.css"]
})
export class NuevaEntrada{

    titulo="";
    contenido="";
    nuevaEnt=false;
    mensaje1="";
    mensaje2="";

    constructor(private servicioFB:ServicioFirebase){}

    escribirEntrada(){
        if(this.titulo.length<=4||this.contenido.length<=24){
            alert("Título, mínimo 5 caracteres. Contenido, mínimo 25 caracteres");
            this.titulo="";
            this.contenido="";
        }else{
            this.mensaje1="Titulo: "+this.titulo+".";     
            this.mensaje2="Contenido: "+this.contenido+".";
            this.nuevaEnt=this.servicioFB.nuevaEntrada(this.titulo,this.contenido);
        }
        
    }
    volverEsc(){
        this.nuevaEnt=false;
        this.titulo="Título";
        this.contenido="";
    }
}