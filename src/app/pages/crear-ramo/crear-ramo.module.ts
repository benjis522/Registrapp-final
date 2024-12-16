import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CrearRamoPageRoutingModule } from './crear-ramo-routing.module';

import { CrearRamoPage } from './crear-ramo.page';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearRamoPageRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule
  ],
  declarations: [CrearRamoPage]
})
export class CrearRamoPageModule {}
