import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service'; 
import { FirebaseService} from '../../services/firebase.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //VAMOS A CREAR UNA VARIABLE QUE RECIBA LOS DATOS DEL USUARIO DESDE LOGIN:
  usuario: any;

  constructor(private router: Router, private FirebaseService:FirebaseService) {}

  ngOnInit(){
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }


  logout(){
    this.FirebaseService.logout();
  }

  
  
}
