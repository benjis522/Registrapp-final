import { Component, OnInit} from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/usuario';
import { DatosqrService } from 'src/app/services/firebase/datosqr.service';
import { AuthService } from 'src/app/services/firebase/auth.service';


@Component({
  selector: 'app-qr',
  templateUrl: 'qr.page.html',
  styleUrls: ['qr.page.scss'],
})


export class QrPage implements OnInit{

  qrValue= ''; //QR

  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private activateRoute: ActivatedRoute,
    private datosqr: DatosqrService,
    private authServices:AuthService
  ) {
  
    this.generarQR()
  }

  ngOnInit(){
    this.authServices.isLogged().subscribe(usuarios=> {
      this.qrValue = usuarios.uid;
    })
  }

  

  generarQR() {
    
    this.qrValue = JSON.parse(localStorage.getItem('usuarioLogin') || '').uid //Esta es la uid del profe
  }

  
}