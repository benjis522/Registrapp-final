import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MostrarRamosService } from 'src/app/services/mostrar-ramos.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.page.html',
  styleUrls: ['./ramos.page.scss'],
})
export class RamosPage implements OnInit {

  ramos: any[]= [];

  constructor(
    private mostrarRamosService: MostrarRamosService,
    private navController:NavController
  ) { }

  ngOnInit() {
    
    this.mostrarRamosService.getRamos().subscribe(ramos => {
      console.log("los ramos son: " + ramos)
      this.ramos = ramos;
    });
  }

  redirigir(ramoid: string){
    this.navController.navigateForward("/ramo/"+ramoid+"/secciones")
  }
  
}
