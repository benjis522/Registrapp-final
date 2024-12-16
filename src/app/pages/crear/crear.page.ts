import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/firebase/auth.service';

import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private mensajes: MensajesService
  ) { 
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      tipo: ['usuario', Validators.required]  // Puede ser 'usuario', 'admin', 'invitado'
    });
  }

  ngOnInit() {}

  async registrarUsuario() {
    if (this.registroForm.valid) {
      const { nombre, apellido, direccion, pass, telefono, tipo } = this.registroForm.value;
      try {
        await this.authService.crearUsuarioConDatos(nombre, apellido, direccion, pass, telefono, tipo);        
        console.log('Usuario registrado exitosamente');
        
        this.router.navigate(["admin"]);

      } catch (error) {
        console.error('Error en el registro:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  irAPaginaDestino() {
    this.router.navigate(['/admin-dashboard']);
  }



  

}
