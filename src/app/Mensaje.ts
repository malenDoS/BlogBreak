export class Mensaje{

    private key="";
    private contenido="";
    private emisor="";
    private receptor="";
    private asunto="";
 
    constructor(key:string,contenido:string,emisor:string,receptor:string,asunto:string){
        this.key=key;
        this.contenido=contenido;
        this.emisor=emisor;
        this.receptor=receptor;
        this.asunto=asunto;
    }

        
    getKey(){
        return this.key;
    }
    getContenido(){
        return this.contenido;
    }
    getEmisor(){
        return this.emisor;
    }
    getReceptor(){
        return this.receptor;
    }
    getAsunto(){
        return this.asunto;
    }
}