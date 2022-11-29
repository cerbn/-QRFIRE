import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variable:
  usuarioLogin: any[] = []
  usuarios: any[] = [
    {
      rut: '11.222.333-4',
      nombre: 'Mike',
      ap_paterno: 'Patton',
      fecha_nac: '2000-12-24',
      correo: 'administrador@duocuc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador'
    },{
      rut: '18.999.000-1',
      nombre: 'brandon',
      ap_paterno: 'sanderson',
      fecha_nac: '1990-06-10',
      correo: 'alumno1@duocuc.cl',
      clave: 'alumno',
      tipo_usuario: 'alumno'
    },{
      rut: '18.999.000-2',
      nombre: 'stephen',
      ap_paterno: 'king',
      fecha_nac: '1990-06-10',
      correo: 'alumno2@duocuc.cl',
      clave: 'alumno',
      tipo_usuario: 'alumno'
    },
    {
      rut: '11.222.333-4',
      nombre: 'Profesor',
      ap_paterno: 'jirafales',
      fecha_nac: '1990-02-29',
      correo: 'profesor1@duocuc.cl',
      clave: 'profesor',
      tipo_usuario: 'profesor'
    },{
      rut: '13.158.524-1',
      nombre: 'julio',
      ap_paterno: 'profe',
      fecha_nac: '1990-02-29',
      correo: 'profesor2@duocuc.cl',
      clave: 'profesor',
      tipo_usuario: 'profesor'
    }



  ];

  //VAMOS A CREAR LA VARIABLE QUE SE ENCARGARÁ DE SABER SI TENGO UNA SESIÓN ACTIVA O NO:
  isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router) { }

  //métodos:
  addUsuario(usuario) {
    if (this.getUsuario(usuario.rut) == undefined) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  getUsuario(rut) {
    return this.usuarios.find(usu => usu.rut == rut);
  }

  getUsuarios() {
    return this.usuarios;
  }

  updateUsuario(usuario) {
    let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }

  deleteUsuario(rut) {
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }


  //métodos customer:
  loginUsuario(correo, clave) {
    var usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
    if (usuarioLogin != undefined) {
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
    //return this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
  }
  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }



  validarCorreo(correo){
    return this.usuarios.find(usu => usu.correo == correo);
  }
}
