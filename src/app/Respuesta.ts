export class Respuesta{
    contenido="";
    emisor="";
    idRespuesta="";
    receptor="";

    constructor(contenido:string,emisor:string,idRespuesta:string,receptor:string){
        this.contenido=contenido;
        this.emisor=emisor;
        this.idRespuesta=idRespuesta;
        this.receptor=receptor;
    }

    getContenido(){
        return this.contenido;
    }
    getEmisor(){
        return this.emisor;
    }
    getIdRespuesta(){
        return this.idRespuesta;
    }
    getReceptor(){
        return this.receptor;
    }
}