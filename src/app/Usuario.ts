
export class Usuario{
    email:string="";
    contrasegna:string="";
    constructor(email:string,contrasegna:string){
        this.email=email;
        this.contrasegna=contrasegna;

    }

    setEmail(email:string){
        this.email=email;
    }
    setContrasegna(contrasegna:string){
        this.contrasegna=contrasegna;
    }
    getEmail(){
        return this.email;
    }
    getContrasegna(){
        return this.contrasegna;
    }
}