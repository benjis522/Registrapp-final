import { Injectable } from '@angular/core';
import { Alumno } from '../alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnos: Alumno[] = [
    {nombre: 'Juan', apellido: 'Perez',  rut:'20586983-3',seccion:'015D'},
    {nombre: 'Maria', apellido: 'Gomez', rut:'20567893-1',seccion:'015D'},
    {nombre: 'Carlos', apellido: 'Lopez',rut:'19785345-5',seccion:'015D'},
    {nombre: 'Ana', apellido: 'Rodriguez',rut:'21356784-4',seccion:'015D'},
    {nombre: 'Pedro', apellido: 'Martinez',rut:'21098345-9',seccion:'016B'},
    {nombre: 'Laura', apellido: 'Garcia',rut:'19465783-3',seccion:'016B'},
    {nombre: 'Jose', apellido: 'Fernandez', rut:'20384894-k',seccion:'016B'},
    {nombre: 'Sofia', apellido: 'Diaz',rut:'21567893-9',seccion:'016B'},

  ]
  constructor() { }

  getAlumnos(){
    return this.alumnos;
  }

  getAlumnoByNombre(){

  }

  addAlumno(alumno: Alumno){
    this.alumnos.push(alumno);
  }

  deleteAlumno(){

  }

  updateAlumno(){
    
  }
}
