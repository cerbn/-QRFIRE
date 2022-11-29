import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { LoadingController, ToastController} from '@ionic/angular';

import { FirebaseService} from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {        

  //variable grupo:
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    //solo se validan correos de alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    //el tipo de usuario cuando se registrar en solo del tipo alumno.
    tipo_usuario: new FormControl('alumno', [Validators.required]),
  });
  repetir_clave: string;
  usuarioEncontrado: any = ''
  usuarios : any [] = [];
   
  asignaturas: any [] = []
  id_modificar: any = '';
  handlerMessage = '';
  roleMessage = ''


  constructor(private validaciones: ValidacionesService, private router: Router,
    private FirebaseService : FirebaseService, private alertController:AlertController, private toast: ToastController) { }

  ngOnInit() {
    this.cargarDatos()

  }






cargarDatos(){
  this.FirebaseService.getUsuarios('usuarios').subscribe(
    data => {
      this.usuarios = [];
      for(let u of data){
        let usu = u.payload.doc.data();
        usu['id'] = u.payload.doc.id;
        this.usuarios.push( usu );
      }
      console.log(this.usuarios)
    }
  );
}



async eliminar(id){
  
  const alert = await this.alertController.create({
    header: 'Alert!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.handlerMessage = 'Alert canceled';
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.FirebaseService.eliminar('usuarios', id);
        },
      },
    ],
  })


  await alert.present();

  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}







registrar(){
  if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
    alert('Rut incorrecto!');
    return;
  }
  if (!this.validaciones.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
    alert('Edad mínima 17 años!');
    return;
  }
  if (this.usuario.controls.clave.value != this.repetir_clave) {
    alert('Contraseñas no coinciden!');
    return;
  }



this.usuarioEncontrado = this.usuarios.find(usu => usu.rut == this.usuario.value.rut)

  if(this.usuarioEncontrado == undefined){
    this.FirebaseService.agregar('usuarios', this.usuario.value)
  this.toastexito('bottom', 'usuario Registrado');

}else{
  this.toastError('bottom', 'usuario ya existe');

}


}




async toastError(position: 'bottom', message: string) {
  const toast = await this.toast.create({
    message: message,
    duration: 3000,
    position: position,
    icon: 'skull-outline'
  });
  toast.present();
  }
  async toastexito(position: 'bottom', message: string) {
  const toast = await this.toast.create({
    message: message,
    duration: 3000,
    position: position,
    icon: 'skull-outline'
  });
  toast.present();
  }














buscar(id){
  this.FirebaseService.getDato('usuarios', id).subscribe(
    (response: any) => {
      //console.log( response.data() );
      this.usuario.setValue( response.data() );
      this.id_modificar = response.id;
    }
  );
}
modificar(){
  let asig = this.usuario.value;
  this.FirebaseService.modificar('usuarios', this.id_modificar, asig);
  this.usuario.reset();
  this.id_modificar = '';
}







}