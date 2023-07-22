import { Comentario } from "./Comentario";

export class Entrada{
    private key:string="";
    private titulo:string="";
    private contenido:string="";

    constructor(titulo:string,contenido:string,key:string){
        this.titulo=titulo;
        this.contenido=contenido;
        this.key=key;
    }
    

    getTitulo():string{
        return this.titulo;
    }
    getContenido():string{
        return this.contenido;
    }
    getKey(){
        return this.key;
    }
    

}




