import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  KEY_ASISTENCIA = 'asistencia';
  asistencia = {
    cod_asistencia: '',
    id_asignatura: '',
    fecha_hora: '',
    alumno: [],

  };


  constructor(private activatedRoute: ActivatedRoute, private asistenciaService: AsistenciaService) { }

  

  ngOnInit() {
/*     this.codClase = this.activatedRoute.snapshot.paramMap.get('rut');
    this.nombre = this.asistenciaService.getUsuario(this.rut);
    this.sigla = this.asistenciaService.getUsuario(this.rut);
    console.table(this.usuario); */
  }

}
