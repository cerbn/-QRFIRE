import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  clase = {
    codClase: '',
    idAsignatura: '',
    fehaHora: '',
    alumnos: ''
  };

  constructor(private storageClase: Storage) { 
    storageClase.create();
  }

  ngOnInit() {
  }

}
