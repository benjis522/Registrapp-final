import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { collection, addDoc, getFirestore} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { MensajesService } from '../mensajes.service';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private mensajes: MensajesService
  ) { }

  login(email: string, pass: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email,pass);
  }

  isLogged(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  registrer(email: string, pass: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email,pass);
  }

  logout(){
    return this.angularFireAuth.signOut();
  }

  recoveryPassword(email: string){
    return this.angularFireAuth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Correo enviado!');
    })
    .catch((error) => {
      console.log('Error al enviar correo de recuperación');
      throw error;
    })
  }
  //crear usuario:

  async crearUsuarioConDatos(
    nombre: string, 
    apellido: string, 
    direccion: string, 
    pass: string, 
    telefono: string, 
    tipo: 'usuario' | 'admin' | 'invitado'
  ): Promise<void> {
    try {
      // Validación del teléfono
      const telefonoRegex = /^9\d{8}$/;
      if (!telefonoRegex.test(telefono)) {
        throw new Error("El número de teléfono debe comenzar con 9 y tener 9 dígitos en total.");
      }

      // Generación del email basado en el tipo
      const dominio = tipo === 'admin' ? 'admin' : tipo === 'usuario' ? 'profesor' : 'alumno';
      const email = `${nombre.toLowerCase()}.${apellido.toLowerCase()}@${dominio}.cl`;
      console.log(email);

      // Crear usuario en Firebase Authentication
      const usuarioFirebase = await this.registrer(email, pass );
      const user = usuarioFirebase.user;

      if(user){
        await this.firestore.collection('usuarios').doc(user.uid).set({
          // TODOS LOS CAMPOS DEL FORMULARIO
          uid:user.uid,
          nombre: nombre,
          email: user.email,
          pass: pass,
          tipo: tipo,
          direccion: direccion,
          telefono: telefono
        });

        this.mensajes.mensaje('Cuenta creada correctamente!','success','Éxito!').then(()=>{
        });
      }

      console.log(`Usuario creado exitosamente con el email: ${email}`);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  //Login Con Google:

  

}
