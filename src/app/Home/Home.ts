import {Component} from "@angular/core";
import { ServicioFirebase } from "../servicios/servicioFirebase";

@Component({
    selector:"homeComp",
    templateUrl:"Home.html",
    styleUrls:["Home.css"]
})

export class Home{

    token:string="";
    constructor(private servicioFB:ServicioFirebase){}
    
    ngOnInit(){
        this.token=this.servicioFB.getCookieToken();
    }

}