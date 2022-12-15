import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { LoadingController, ToastController} from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  asignaturas: any [] = []
  id_modificar: any = '';
  handlerMessage = '';
  roleMessage = ''
  usuarios: any[] = [];
  usrProf: any[] = [];

  //variable:
  asignatura = new FormGroup({
    sigla: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required]),
    rutprof_asignatura: new FormControl('', [Validators.required]),
  });


  asignaturasEncontradas: any 
  //variable de pruebas unitarias:
  v_agregar: boolean = false;

  constructor(private fireService: FirebaseService, private alertController: AlertController
              ,private toast: ToastController) {}

  ngOnInit(){
    this.cargarDatos()
    this.cargarDatosProf()
    }


/*     this.usrProf = this.usuarios.find(u => u.tipo_usuario == 'profesor');
 */
cargarDatosProf(){
  this.fireService.getDatos('usuarios').subscribe(
    (datosfb: any) => {
      this.usuarios = [];
      for(let u of datosfb){
        // console.log(usuario.payload.doc.data());
        let usu = u.payload.doc.data();
        usu['id'] = u.payload.doc.id;
        this.usuarios.push(usu);
        this.usrProf = this.usuarios.filter(u => u.tipo_usuario == 'profesor');
      }
    }
  );
}



    cargarDatos(){
      this.fireService.getUsuarios('asignaturas').subscribe(
        data => {
          this.asignaturas = [];
          for(let u of data){
            let usu = u.payload.doc.data();
            usu['id'] = u.payload.doc.id;
            this.asignaturas.push( usu );
          }
          console.log(this.usuarios)
        }
      );
    }

agregar(){
this.asignaturasEncontradas = this.asignaturas.find(asig=> asig.sigla == this.asignatura.value.sigla)
if (this.asignaturasEncontradas == undefined) {
  this.fireService.agregar('asignaturas', this.asignatura.value)
  this.toastexito('bottom', 'asignatura agregada');
}else{
  this.toastError('bottom', 'asignatura ya existe');


}


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
          this.fireService.eliminar('asignaturas', id);
        },
      },
    ],
  })


  await alert.present();

  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}



  buscar(id){
    this.fireService.getDato('asignaturas', id).subscribe(
      (response: any) => {
        //console.log( response.data() );
        this.asignatura.setValue( response.data() );
        this.id_modificar = response.id;
      }
    );
  }
  modificar(){
    let asig = this.asignatura.value;
    this.fireService.modificar('asignaturas', this.id_modificar, asig);
    this.asignatura.reset();
    this.id_modificar = '';
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


