import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { BehaviorSubject, using } from 'rxjs';
import firebase from 'firebase/compat/app';
  

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  isAuthenticated = new BehaviorSubject(false);
  usuarioLogin: any[] = []
  ususRegistrados: any[] = []

  constructor(private fire: AngularFirestore, private router: Router) { }


  agregar(coleccion, value){
    try {

      return this.fire.collection(coleccion).add(value);

    } catch (error) {
      console.error(error);
    }

  }

  
   //Registro
  getUsuarios(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  getUsuario(coleccion, id){
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }


//LOGIN


loginUsuario(){

  this.isAuthenticated.next(true);

}

getDatos(coleccion){
  try {
    return this.fire.collection(coleccion).snapshotChanges();
  } catch (error) {
    console.log(error);
  }
}

getAuth(){
  return this.isAuthenticated.value;
}
logout(){
  this.isAuthenticated.next(false);
  this.router.navigate(['/login']);
}


//ASIGNATURA

  agregarAsignatura(coleccion, sigla){
    try {
if (this.getAsignatura(coleccion, sigla) == undefined) {
    this.fire.collection(coleccion).add(sigla);
      return true;
}
      }
    catch (error) {
      console.log(error)
    }
  }

  getAsignatura(coleccion, sigla){
    return this.fire.collection(coleccion).doc(sigla).get();
  }







//CLASE
agregaClase(coleccion, id, value){

  this.fire.collection(coleccion).doc(id).set(value);

}











//CRUD ADMINISTRADOR

  eliminar(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

   getDato(coleccion, id){
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  } 
   getrut(coleccion, rut){
    try {
      return this.fire.collection(coleccion).doc(rut).get();
    } catch (error) {
      console.log(error);
    }
  } 

  modificar(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }
  modificarclase(id, value){
    try {
      this.fire.collection('clases').doc(id).update({
       alumno: firebase.firestore.FieldValue.arrayUnion(value)
      }

      )
    } catch (error) {
      console.error(error);
    }
  }






/*   async agregarqr(key, codAlumno, usuario){
    this.asistencias = await this.asistenciaStorage.get(key) || [];
  
    var index = this.asistencias.findIndex(value => value.value == codAlumno);
      this.asistencias[index].alumno.push(usuario.rut);
      await this.asistenciaStorage.set(key, this.asistencias);
      return true;
    
  }
   */
}
