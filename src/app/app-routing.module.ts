import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SeccionPage } from './pages/seccion/seccion.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splashscreen',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./pages/splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/registrer/registrer.module').then( m => m.RegistrerPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'ramo/:ramoId/secciones', component: SeccionPage,
    loadChildren: () => import('./pages/seccion/seccion.module').then( m => m.SeccionPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'invitado-dashboard',
    loadChildren: () => import('./pages/invitado/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'detalle-alumno',
    loadChildren: () => import('./pages/detalle-alumno/detalle-alumno.module').then( m => m.DetalleAlumnoPageModule)
  },
  {
    path: 'usuario-dashboard',
    loadChildren: () => import('./pages/usuarios/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

  {
    path: 'ramos',
    loadChildren: () => import('./pages/ramos/ramos.module').then( m => m.RamosPageModule)
  },
  {
    path: 'detalle-seccion',
    loadChildren: () => import('./pages/detalle-seccion/detalle-seccion.module').then( m => m.DetalleSeccionPageModule)
  },
  {
    path: 'escanearqr',
    loadChildren: () => import('./pages/escanearqr/escanearqr.module').then( m => m.EscanearqrPageModule)
  },
  {
    path: 'ramosalumno',
    loadChildren: () => import('./pages/ramosalumno/ramosalumno.module').then( m => m.RamosalumnoPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'registro-asistencia',
    loadChildren: () => import('./pages/registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./pages/crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'ramo',
    loadChildren: () => import('./pages/crear-ramo/crear-ramo.module').then( m => m.CrearRamoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
