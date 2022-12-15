import { Component, OnInit } from '@angular/core';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 } from 'uuid';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoadingController, ToastController} from '@ionic/angular';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  profesor : any;
  elementType: NgxQrcodeElementTypes = NgxQrcodeElementTypes.CANVAS;
  
  usuarios: any [] = [];
  asignaturas: any[] = [];
  clasess: any[] = [];
  
  rut :string = '' ;
  clases: any =''
  clasesFecha: any =''
  id: any = ''
  estado: any = 'No Iniciada'
  cantidad : any [] = []

  asistencia = {
    ide: '',
    fecha_hora: new Date(),
    alumno: [],

  };

  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private FirebaseService: FirebaseService,
              private toast: ToastController) { }

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.cargarAsignaturas()    
    this.cargarClases()

  }
  

  cargarAsignaturas(){
    this.FirebaseService.getDatos('asignaturas').subscribe(
      data => {
        this.asignaturas = [];
        for(let asignaturas of data){
          console.log( asignaturas.payload.doc.data() );
          let usu = asignaturas.payload.doc.data();
          usu['id'] = asignaturas.payload.doc.id;
          this.asignaturas.push( usu );
        }
        console.log(this.asignaturas)
      }
    );
  }

  cargarClases(){
    this.FirebaseService.getDatos('clases').subscribe(
      data => {
        for(let clasess of data){
          console.log( clasess.payload.doc.data() );
          let usu = clasess.payload.doc.data();
          usu['id'] = clasess.payload.doc.id;
          this.clasess.push( usu );
        }
        console.log(this.clasess)
      }
    );
  }



  buscarId(id){
    this.FirebaseService.getDato('asignaturas', id).subscribe(
      (response: any) => {
        ( response.data() );
        this.id = response.id;
        console.log(this.id)
      }
    );
  }



  generarQR(){
    if (this.asistencia.ide == '') {
      this.asistencia.ide = this.id
        }}
 


generarClase(){
 this.clases = this.clasess.find(clas => clas.ide == this.asistencia.ide)
if(this.clases == undefined){

    console.log(this.clases)
    this.FirebaseService.agregar('clases', this.asistencia)
    this.estado = 'Clase Iniciada'
   
    this.toastexito('bottom', 'La Clase Fue Iniciada');


}else{
  this.toastError('bottom', 'Error! clase no iniciada');
  this.asistencia.ide = ''
}}


resetIde(){

  this.asistencia.ide = ''
  this.estado = 'Clase Terminada'

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



  
