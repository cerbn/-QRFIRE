import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  //variable del correo:
  correo: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router, private cargar: LoadingController) { }

  ngOnInit() {
  }

  //método para recuperar
  recuperar(){
    if (this.usuarioService.validarCorreo(this.correo) != undefined) {
      alert('Se ha enviado la nueva contraseña a tu correo!');
      this.correo = '';
      this.router.navigate(['/login']);
    }else{
      alert('Correo incorrecto!');
    }
  }

  async showLoading(){
    const cargando = await this.cargar.create({
      message: 'Cargando...',
      duration: 2000,
      spinner: 'bubbles'
    });

    cargando.present();
  }
}
