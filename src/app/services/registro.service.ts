import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private fire: AngularFirestore, ) { }

  agregarUsuario(coleccion, value){
    try {

      return this.fire.collection(coleccion).add(value);

    } catch (error) {
      console.error(error);
    }

  }

  buscarUsuario(coleccion, id){
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

  modificarUsuario(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }

  }

  eliminarUsuario(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.error(error);
    }

  }

}
