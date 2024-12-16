import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Usuario } from 'src/app/usuario';
import { NativeBiometric} from 'capacitor-native-biometric'; 


@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    // DEJAMOS UN TIMER QUE REDIRECCIONA
    setTimeout(() =>{
      this.checkLogin();
    }, 2000);
  }

  async checkLogin(){
    this.authService.isLogged().subscribe(async(user)=>{
        if(user) {
          try {
            //verificamos con la huella
            await this.checkHuelladigital();
      
            const usuario = await this.firestore.collection('usuarios')
            .doc(user.uid).get().toPromise(); 
            const userData = usuario?.data() as Usuario;
    
            if(userData) {
              if(userData.tipo === 'admin') {
                this.router.navigate(['/admin-dashboard']);
              }else if(userData.tipo === 'usuario') {
                this.router.navigate(['/usuario-dashboard']);
              }else{
                this.router.navigate(['/invitado-dashboard']);
              }
            }
          } catch (error) {
            this.router.navigate(['login']);
          }
        } else {
          this.router.navigate(['login']);
        }
      
    });
  }

  async checkHuelladigital(){
    try {
      await NativeBiometric.verifyIdentity({
        reason: 'Por favor, autentificate para continuar',
        title: 'Autentición Biométrica',
        subtitle: 'Usa tu huella digital o face ID',
        description: 'Coloca tu huella en el sensor para ingresar'
      })
    } catch (error) {
      throw error; //forzamos el error para capturarlo
    }
  }

}
