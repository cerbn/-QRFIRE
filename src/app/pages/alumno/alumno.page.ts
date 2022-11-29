import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AsistenciaPageModule } from '../asistencia/asistencia.module';
import { ProfesorPage } from '../profesor/profesor.page';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, ToastController} from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
   
  rut: any;
  codAlumno : any;
  clases: any [] = []
  clasesIni : any;

  constructor(private activatedRoute: ActivatedRoute, private AsistenciaService: AsistenciaService,  private usuarioService : UsuarioService,
    private cargar: LoadingController, private FirebaseService:FirebaseService,private toast: ToastController ) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.cargarDatos()
    this.cargarclase()
/*     console.table(this.clases);
 */  }

  cargarDatos(){
    this.FirebaseService.getDatos('clases').subscribe(
      data => {
        this.clases = [];
        for(let clase of data){
          console.log( clase.payload.doc.data() );
          let usu = clase.payload.doc.data();
          usu['id'] = clase.payload.doc.id;
          this.clases.push( usu );
        }
        console.log(this.clases)
      }
    );
  }
  cargarclase(){
    this.FirebaseService.getDatos('clases').subscribe(
      data => {
        this.clases = [];
        for(let clase of data){
          console.log( clase.payload.doc.data() );
          let usu = clase.payload.doc.data();
          usu['id'] = clase.payload.doc.id;
          this.clases.push( usu );
        }
        console.log(this.clases)
      }
    );
  }



modificar(){
this.clasesIni = this.clases.find(clas => clas.ide == this.codAlumno)
if (this.clasesIni != undefined ) {
  console.log(this.clasesIni.id)
  this.FirebaseService.modificarclase(this.clasesIni.id, this.rut)
  this.toastexito('bottom', 'presente');
}else{
  this.toastError('bottom', 'Ausente');

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