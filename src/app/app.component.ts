import { Component } from '@angular/core';
import { Page } from './page';
import config from 'capacitor.config';
import { Router, NavigationEnd, Event} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: Page[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;

  showComponent: boolean = false;

  constructor(private router: Router) {}

    
  
    ngOnInit(){
      const usuario = localStorage.getItem('usuarioLogin');
      
      if(usuario){
        const aux = JSON.parse(usuario);
        this.tipoUsuario = aux.tipo;
        this.emailUsuario = aux.email;
        this.configSideMenu();
      }else{
        //redirigir a login
        this.tipoUsuario = 'invitado';
      }
    }

    configSideMenu(){
      if(this.tipoUsuario === 'admin'){
        this.appPages = [
          {title: 'Panel', url: '/admin-dashboard', icon: ''},
          {title: 'Crear Usuario', url: '/crear', icon: ''},
          {title: 'Crear Ramo', url: '/ramo', icon: ''},
          {title: 'Ingresar Alumno', url: '/alumnos', icon: ''},
          {title: 'Cerrar Sesión', url: '/login', icon: 'log-in-outline'},
        ]
      }else if(this.tipoUsuario === 'invitado'){
        this.appPages = [
          {title: 'Dashboard', url: '/invitado-dashboard', icon: ''},
          {title: 'Perfil', url: '/invitado-dashboard', icon: ''},
          {title: 'Cerra Sesión', url: '/login', icon: ''},
        ]
      }else if(this.tipoUsuario === 'usuario'){
        this.appPages = [
          {title: 'Dashboard', url: '/usuario-dashboard', icon: ''}, 
          {title: 'Perfil', url: '/usuario-dashboard', icon: ''},
          {title: 'Cerrar Sesión', url: '/login', icon: ''},
        ]
      }else{
        this.appPages = [
          {title: 'Login', url: '/login', icon: 'home'},
          {title: 'Registrarse', url: '/register', icon: 'home'},
        ]
      }
    }

    
  
}
