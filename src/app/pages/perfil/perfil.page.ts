import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //VAMOS A CREAR LAS VARIABLES NECESARIAS PARA RECIBIR EL DATO:
  rut: string;
  usuario :any ;
  usuarios : any [] = [];


  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, 
              private router: Router ,private FirebaseService:FirebaseService) { }

  ngOnInit() {
    this.cargarDatos()
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    /* this.fitro() */
    
    console.log(this.rut)

  }


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
      this.usuario = this.usuarios.filter(usu=> usu.rut == this.rut)
    if (this.usuario.rut != undefined) {
      return this.usuario
    }

  }

/*    fitro(){
    this.usuario = this.usuarios.filter(usu=> usu.rut == this.rut)
    console.log(this.usuario)
    return this.usuario
  } 
 */



}
