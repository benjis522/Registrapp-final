import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Usuario } from 'src/app/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.page.html',
  styleUrls: ['./registrer.page.scss'],
})
export class RegistrerPage implements OnInit {

  loginForm: FormGroup;
  emailValue: string = ' ';
  passValue: string = ' ';

  constructor(
    private router:Router,
    private formBuilder:FormBuilder, 
    private loadingController: LoadingController,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private mensajes: MensajesService
  ) {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  async register() {
    const nuevoUsuario: Usuario = {
      email: this.emailValue || '',
      pass: this.passValue || '',
      tipo: 'invitado',
    }
    
    try {
      const usuarioFirebase = await this.authService.registrer(this.emailValue, this.passValue );
      const user = usuarioFirebase.user;

      if(user){
        await this.firestore.collection('usuarios').doc(user.uid).set({
          // TODOS LOS CAMPOS DEL FORMULARIO
          uid:user.uid,
          nombre: 'NOMBRE USUARIO',
          email: user.email,
          pass: this.passValue,
          tipo: 'usuario'
        });

        this.mensajes.mensaje('Cuenta creada correctamente!','success','Éxito!').then(()=>{
          this.router.navigate(['/login']);
        });
      }
    } catch (error) {
      this.mensajes.mensaje('Error al crear la cuenta de usuario, intentelo nuevamente','error', 'Error!')
    }
    
  }

}
