import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  asignaturas: any[] = [];

  constructor(private asignaturaStorage: Storage, private fire: AngularFirestore) { 
    asignaturaStorage.create();
  }

  //MÉTODOS DEL CRUD DEL STORAGE:
  async agregar(key, Asignatura){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];
    
    //VAMOS A VER SI EL DATO QUE VIENE COMO PARÁMETRO TIENE id:
    //si tiene id, buscamos si existe, si NO tiene id, agregamos:
    if(Asignatura.id == ''){
      var id = this.asignaturas.length + 1;
      Asignatura.id = id;
      this.asignaturas.push(Asignatura);
      await this.asignaturaStorage.set(key, this.asignaturas);
      return true;
    }
    return false;
  }
  
  async getDato(key, identificador){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];
    return this.asignaturas.find(Asignatura => Asignatura.profesor == identificador);
  }

  async getDatos(key){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];
    return this.asignaturas;
  }

  async eliminar(key, identificador){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];

    this.asignaturas.forEach((value, index) => {
      if(value.id == identificador){
        this.asignaturas.splice(index, 1);
      }
    });

    await this.asignaturaStorage.set(key, this.asignaturas);
  }

  async actualizar(key, dato){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];

    var index = this.asignaturas.findIndex(value => value.id == dato.id);
    this.asignaturas[index] = dato;

    await this.asignaturaStorage.set(key, this.asignaturas);
  }

  agregarAsignatura(coleccion, value){
    try {

      return this.fire.collection(coleccion).add(value);

    } catch (error) {
      console.error(error);
    }

  }

  buscarAsignatura(coleccion, id){
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.error(error);
    }

  }

  buscarTodo(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.error(error);
    }

  }

  modificar(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }

  }

  eliminarAsignatura(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.error(error);
    }

  }

  


  
}
