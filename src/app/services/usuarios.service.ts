import { Injectable } from '@angular/core';
import { Usuario } from '../usuario';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  usuarios: Usuario[] = [
    {'email': 'admin@admin.cl', 'pass':'admin1234', 'tipo': 'admin' },
    {'email': 'user@profe.cl', 'pass':'profe1234', 'tipo': 'usuario' },
    {'email': 'invitado@invitado.cl', 'pass':'invitado1234', 'tipo': 'invitado' },
  ]
  constructor() {}

  getUsuario(){
    return this.usuarios;
  }

  getUsuarioByEmail(){
  }

  addUsuario(usuario: Usuario){
    this.usuarios.push(usuario);
  }

  deleteUsuario(){
    
  }

  updateUsuario(){
    
  }
}
