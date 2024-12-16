import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  email:string ='';

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  async recoveryPassword(){
    try {
      let timerInterval: any;
      await this.authService.recoveryPassword(this.email);

        Swal.fire({
          title: "Procesando!",
          html: "Enviando correo",
          timer: 2000,
          timerProgressBar: true,
          heightAuto: false,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup()!.querySelector("b");
            timerInterval = setInterval(() => {
              timer!.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            

            Swal.fire({
              title: "Éxito!",
              text: "Cuenta creada corrrectamente!",
              icon: "success",
              confirmButtonText: 'OK',
              heightAuto: false
            })
          }
        });
    } catch (error) {
      
    }
  }


}
