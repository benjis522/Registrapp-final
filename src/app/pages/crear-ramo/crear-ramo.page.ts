import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-crear-ramo',
  templateUrl: './crear-ramo.page.html',
  styleUrls: ['./crear-ramo.page.scss'],
})
export class CrearRamoPage implements OnInit {
  ramoForm: FormGroup;
  profesores: any[] = [];
  ramos: any[] = [];
  
  constructor(private fb: FormBuilder, private firestore: Firestore) { 
    this.ramoForm = this.fb.group({
      ramoSeleccionado: [null], // null si se crea un nuevo ramo
      nombreRamo: [''], // Solo necesario si se crea uno nuevo
      nombreSeccion: ['', Validators.required],
      profesor: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.cargarProfesores();
    this.cargarRamos();
  }

  cargarProfesores() {
    const usuariosRef = collection(this.firestore, 'usuarios');
    collectionData(usuariosRef, { idField: 'id' }).subscribe((data: any[]) => {
      this.profesores = data.filter((usuario) => usuario.tipo === 'usuario');
    });
  }

  cargarRamos() {
    const ramosRef = collection(this.firestore, 'ramos');
    collectionData(ramosRef, { idField: 'id' }).subscribe((data: any[]) => {
      this.ramos = data;
    });
  }

  async guardarDatos() {
    const { ramoSeleccionado, nombreRamo, nombreSeccion, profesor } = this.ramoForm.value;

    try {
      let ramoId;

      // Si se seleccionó un ramo existente
      if (ramoSeleccionado) {
        ramoId = ramoSeleccionado.id;
      } else {
        // Crear un nuevo ramo
        const ramosRef = collection(this.firestore, 'ramos');
        ramoId = (await addDoc(ramosRef, { nombre: nombreRamo, id: '' })).id;

        // Actualizar el ramo con su ID
        const ramoDoc = doc(this.firestore, `ramos/${ramoId}`);
        await setDoc(ramoDoc, { id: ramoId, nombre: nombreRamo }, { merge: true });
      }

      // Agregar la nueva sección dentro del ramo
      const seccionesRef = collection(this.firestore, `ramos/${ramoId}/secciones`);
      const seccionId = (await addDoc(seccionesRef, {
        nombre: nombreSeccion,
        id: '',
        usuario: {
          id: profesor.id,
          nombre: profesor.nombre,
        },
      })).id;

      // Actualizar la sección con su ID
      const seccionDoc = doc(this.firestore, `ramos/${ramoId}/secciones/${seccionId}`);
      await setDoc(seccionDoc, { id: seccionId }, { merge: true });

      alert('Ramo o sección guardados exitosamente.');
      this.ramoForm.reset();
      this.cargarRamos(); // Actualizar la lista de ramos
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  }

  // Actualizar estado del formulario cuando se cambia el ramo seleccionado
  onRamoChange() {
    const ramoSeleccionado = this.ramoForm.get('ramoSeleccionado')?.value;
    if (ramoSeleccionado) {
      this.ramoForm.get('nombreRamo')?.clearValidators();
      this.ramoForm.get('nombreRamo')?.reset();
    } else {
      this.ramoForm.get('nombreRamo')?.setValidators([Validators.required]);
    }
    this.ramoForm.get('nombreRamo')?.updateValueAndValidity();
  }

}
