import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MostrarRamosService } from 'src/app/services/mostrar-ramos.service';

@Component({

  selector: 'app-seccion',
  templateUrl: './seccion.page.html',
  styleUrls: ['./seccion.page.scss'],
})
export class SeccionPage implements OnInit {

  seccion: any[] = [];
  ramoId: string ='';

  constructor(private router: Router, private mostrarRamosService: MostrarRamosService, private route: ActivatedRoute) { }

  ngOnInit() {
    //obtiene el id del ramo desde los parámetros de la ruta
    this.ramoId = this.route.snapshot.paramMap.get('ramoId')!;

    // Llama al servicio para obtener las secciones del ramo específico
    this.mostrarRamosService.getSeccionesByRamo(this.ramoId).subscribe(secciones => {
      this.seccion = secciones;

    });
  }

  verDetalleSeccion(aux:any){
    this.router.navigate(['detalle-seccion']);
  }
}
