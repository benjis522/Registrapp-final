import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RamosalumnoPageRoutingModule } from './ramosalumno-routing.module';

import { RamosalumnoPage } from './ramosalumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RamosalumnoPageRoutingModule
  ],
  declarations: [RamosalumnoPage]
})
export class RamosalumnoPageModule {}
