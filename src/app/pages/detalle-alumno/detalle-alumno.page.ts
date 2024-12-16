import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.page.html',
  styleUrls: ['./detalle-alumno.page.scss'],
})
export class DetalleAlumnoPage implements OnInit {

  //CREAMOS VARIABLES PARA RECIBIR LO DEL PARAM
  
  nombreAlumno?: string | null;
  apellidoAlumno?: string | null;
  rutAlumno?:string | null;
  seccionAlumno?: string | null;

  constructor(
    private activateRoute : ActivatedRoute,
    private AlumnosService : AlumnosService
  ) { }

  ngOnInit() {
    this.nombreAlumno = this.activateRoute.snapshot.paramMap.get('nombre');
    const aux = this.AlumnosService.getAlumnos();
    const alumno =aux.find(aux => aux.nombre === this.nombreAlumno);
    if(alumno){
      this.apellidoAlumno = alumno.apellido;
      this.rutAlumno = alumno.rut;
      this.seccionAlumno = alumno.seccion;
    }
  }


}
