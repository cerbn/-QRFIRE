import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
asistencia = {
  cod_asistencia: '',
  cod_clase: '',
  fecha_hora: '',
  alumnos: []
}
  constructor() { }
}
