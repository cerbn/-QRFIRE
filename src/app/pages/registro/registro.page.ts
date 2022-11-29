import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  //variable grupo:
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    //solo se validan correos de alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    //el tipo de usuario cuando se registrar en solo del tipo alumno.
    tipo_usuario: new FormControl('alumno', [Validators.required]),
  });
  repetir_clave: string;
  usuarioEncontrado: any = ''
  usuarioEncontradoCorreo: any = ''
  usuarios : any [] = [];
   

  constructor(private usuarioService: UsuarioService, private validaciones: ValidacionesService, private router: Router,
    private FirebaseService : FirebaseService,  private toast: ToastController) { }

  ngOnInit() {
    this.cargarDatos()

  }

 /*  //métodos:
  registrar() {
    //validación de salida para buscar un rut válido.
    if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
      alert('Rut incorrecto!');
      return;
    }
    //validación de salida para verificar que persona tenga al menos 17 años.
    if (!this.validaciones.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
      alert('Edad mínima 17 años!');
      return;
    }
    //validación de coincidencia de contraseñas.
    if (this.usuario.controls.clave.value != this.repetir_clave) {
      alert('Contraseñas no coinciden!');
      return;
    }

    if (this.usuarioService.addUsuario(this.usuario.value)) {
      alert('Usuario registrado!');
      this.usuario.reset();
      this.repetir_clave = '';
      this.router.navigate(['/login']);
    } else {
      alert('Usuario ya existe!');
    }
  }

} */

cargarDatos(){
  this.FirebaseService.getUsuarios('usuarios').subscribe(
    data => {

      for(let u of data){
        let usu = u.payload.doc.data();
        usu['id'] = u.payload.doc.id;
        this.usuarios.push( usu );
      }
      console.log(this.usuarios)
    }
  );
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
this.usuarioEncontradoCorreo = this.usuarios.find(usu => usu.correo == this.usuario.value.correo)

  if(this.usuarioEncontrado == undefined && this.usuarioEncontradoCorreo == undefined ){
    this.toastexito('bottom', 'Usuario Registrado con Exito!!'); 
    this.FirebaseService.agregar('usuarios', this.usuario.value)
    this.router.navigate(['/login'])
    this.usuario.reset();

} else {
  this.toastError('bottom', 'Error! Usuario Ya Existe!');
  //console.log(this.usuario)
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

}



