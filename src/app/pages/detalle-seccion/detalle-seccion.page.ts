import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-detalle-seccion',
  templateUrl: './detalle-seccion.page.html',
  styleUrls: ['./detalle-seccion.page.scss'],
})
export class DetalleSeccionPage implements OnInit {

  seccion?:string;

  AlumnosFiltrados: Alumno[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private alumnosServices: AlumnosService
  ) { }

  ngOnInit() {
    this.seccion = this.activateRoute.snapshot.paramMap.get('nombre') || '';
    this.filtrarAlumnosPorSeccion();
  }

  filtrarAlumnosPorSeccion(){
    const aux = this.alumnosServices.getAlumnos();
    this.AlumnosFiltrados = aux.filter(aux => aux.seccion === this.seccion)
  }

  verDetalleAlumno(aux:any){
    this.router.navigate(['detalle-alumno', aux.nombre])
  }
}
