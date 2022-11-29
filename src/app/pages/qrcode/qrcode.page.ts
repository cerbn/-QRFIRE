import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

import { v4 } from 'uuid';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  //VARIABLES PARA CREAR NUESTRO CÓDIGO QR:
  elementType: NgxQrcodeElementTypes = NgxQrcodeElementTypes.CANVAS;
  value = '';

  

  constructor(private alerta: AlertController) { }

  async presentAlert(){
    const alerta = await this.alerta.create({
      header: 'Alerta',
      subHeader: 'Ha elegido esta opción',
      message: '¿Está seguro/a que quiere empezar la clase?',
      buttons: ['si']
    });

    await alerta.present();
  }

  ngOnInit() {
    
  }

  generarQR(){
    if (this.value == '') {
      this.value = v4();
    }

  }
}
