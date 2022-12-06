import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  is_logued: boolean;


  usuarios : any [] = []
  correoConcatenado:any;
  //variables:
  
  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  usuarioEncontrado: any 

  constructor(private router: Router, private usuarioService: UsuarioService, private cargar: LoadingController,
    private FirebaseService : FirebaseService, private alertController: AlertController, private toast: ToastController) { }






    
  ngOnInit() {
    this.cargarDatos()  
  }

  cargarDatos(){
    this.FirebaseService.getUsuarios('usuarios').subscribe(
      data => {
  
        for(let u of data){
          let usu = u.payload.doc.data();
/*           usu['id'] = u.payload.doc.id;
 */          this.usuarios.push( usu );
        }
        console.log(this.usuarios)
      }
    );
  }
  
  
  
  ingresar() {
    
    this.correoConcatenado = this.usuario.value.correo+''+'@duocuc.cl'
    console.log(this.correoConcatenado)
    this.usuarioEncontrado = this.usuarios.find(usu=> usu.correo ==this.correoConcatenado && usu.clave == this.usuario.value.clave)


  if (this.usuarioEncontrado != undefined) {
    this.FirebaseService.loginUsuario()
    //AQUI, ANTES DE REDIRECCIONAR HACIA OTRA PÁGINA, PREPARAREMOS LOS DATOS QUE QUEREMOS ENVIAR:
    var navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuarioEncontrado
      }
    }
    
    //redirigimos dependiente del tipo de usuario
    this.router.navigate(['/home'], navigationExtras);
    this.usuario.reset();
    
  }
  else {
    this.toastError('bottom', 'Usuario o contraseña Incorrectos!!!');
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

}
  

