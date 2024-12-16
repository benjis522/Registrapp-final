import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/usuario';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  emailValue?: string;
  passValue?: string;



  constructor(
    private router:Router,
    private formBuilder:FormBuilder, 
    private alertController: AlertController, 
    private loadingController: LoadingController,
    private usuariosService: UsuariosService,
    private menuController: MenuController,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private http: HttpClient,
    private afAuth: AngularFireAuth
    ) {
    

    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  async login() {
    try {
      const loading = await this.loadingController.create({
        message: 'Cargando.....',
        duration: 2000
      });
      
      const email = this.emailValue;
      const pass = this.passValue;


      const usuarioLogeado = await this.authService.login(email as string, pass as string);

      if (usuarioLogeado.user) {
        await loading.present();
        localStorage.setItem('usuarioLogin', email as string);

        const usuario =await this.firestore.collection('usuarios').
        doc(usuarioLogeado.user.uid).get().toPromise();
        const userDate = usuario?.data() as Usuario
        localStorage.removeItem('usuarioLogin')
        localStorage.setItem('usuarioLogin', JSON.stringify(userDate))

        
  
        setTimeout(async() => {
          await loading.dismiss();
          if (userDate.tipo === 'admin'){
            this.router.navigate(['/admin-dashboard']);
          } else if (userDate.tipo === 'usuario'){
            this.router.navigate(['/usuario-dashboard']);
          }else {
            this.router.navigate(['/invitado-dashboard']);
          }
          
        }, 2000);
      }
    } catch(error) {
      
      Swal.fire({
        title: "Error!",
        text: "Error en las credenciales, intente nuevamente",
        icon: "error",
        confirmButtonText: 'OK',
        heightAuto: false
      });

      this.emailValue = '';
      this.passValue = '';
    }
  }
  //GENERACIÓN DE LOS 10 USUARIOS
  generateUsers() { 
    const apiUrl = 'https://randomuser.me/api/?results=10';

    this.http.get<any>(apiUrl).subscribe((response) => {
      const usuarios = response.results;

      // Formatear los usuarios
      const formattedUsers = usuarios.map((usuario: any, index: number) => {
        const nombre = usuario?.name?.first?.toLowerCase();
        const apellido = usuario?.name?.last?.toLowerCase();

        const tipo = index < 5 ? 'usuario' : 'invitado'; // 5 docentes, 5 alumnos
        const dominio = index < 5 ? 'profesor.cl' : 'alumno.cl';

        return {
          nombre: `${nombre} ${apellido}`,
          email: `${nombre}.${apellido}@${dominio}`,
          tipo: tipo,
          pass: 'contraseñaGeneral123', // Contraseña fija
        };
      });

      // Guardar usuarios en Firebase
      this.saveUsersToFirebase(formattedUsers);
    });
  }

  // Método para guardar usuarios en Firebase
  async saveUsersToFirebase(usuarios: any[]) {
    for (const usuario of usuarios) {
      try {
        // Crear usuario en Firebase Authentication
        const authResult = await this.afAuth.createUserWithEmailAndPassword(
          usuario.email,
          usuario.pass
        );

        // Guardar información adicional en Firestore
        await this.firestore.collection('users').doc(authResult.user?.uid).set({
          nombre: usuario.nombre,
          email: usuario.email,
          tipo: usuario.tipo,
          pass: usuario.pass,
        });

        console.log(`Usuario ${usuario.email} creado y guardado en Firestore.`);
      } catch (error) {
        console.error(`Error al crear el usuario ${usuario.email}:`, error);
      }
    }
  }


}
