import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RamosalumnoPage } from './ramosalumno.page';

const routes: Routes = [
  {
    path: '',
    component: RamosalumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RamosalumnoPageRoutingModule {}
