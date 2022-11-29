import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  asistencias: any[] = [];
  rut = '';
  alumno :''
  constructor(private asistenciaStorage: Storage) {
    asistenciaStorage.create();
   }


 //MÉTODOS DEL CRUD DEL STORAGE:
 async agregar(key, asistencia){
  this.asistencias = await this.asistenciaStorage.get(key) || [];
    this.asistencias.push(asistencia);
    await this.asistenciaStorage.set(key, this.asistencias);
    return true;
  
}



async getDatos(key){
  this.asistencias = await this.asistenciaStorage.get(key) || [];
  return this.asistencias;

}


async agregarqr(key, codAlumno, usuario){
  this.asistencias = await this.asistenciaStorage.get(key) || [];

  var index = this.asistencias.findIndex(value => value.value == codAlumno);
    this.asistencias[index].alumno.push(usuario.rut);
    await this.asistenciaStorage.set(key, this.asistencias);
    return true;
  
}

}
