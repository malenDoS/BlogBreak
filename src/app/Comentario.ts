export class Comentario{

    private idC:string="";
    private Comentario:string="";
    private usuarioC:string="";

    constructor(idC:string,Comentario:string,usuario:string){
        this.idC=idC;
        this.Comentario=Comentario;
        this.usuarioC=usuario;
    }

    getUsuarioC(){
        return this.usuarioC;
    }

    getComentario(){
        return this.Comentario;
    }
    getIdc(){
        return this.idC;
    }
}