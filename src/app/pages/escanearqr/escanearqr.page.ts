import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escanearqr',
  templateUrl: './escanearqr.page.html',
  styleUrls: ['./escanearqr.page.scss'],
})
export class EscanearqrPage implements OnInit {

  constructor( 
    private authServices:AuthService,
    private modalController: ModalController,
    private platform: Platform,
    private router: Router) { }

  ngOnInit() {
    
  }

  //tiene la camara

  // async openCamera() {
    //const modal = await this.modalController.create({
      //component: BarcodeScanningModalComponent,
      //cssClass: 'barcode-scanner-modal',
      //showBackdrop: false,
      //componentProps: {
        //formats: [],
        //LensFacing: LensFacing.Back
      //}
   // });
    
  showImage = false;

  toggleImage() {
    this.showImage = !this.showImage;
  }
}
