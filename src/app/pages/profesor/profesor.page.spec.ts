import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistroPage } from './registro.page';

/* describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); */

describe('Página registro',() => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        RegistroPage
      ]
    }).compileComponents();
  });

  it('Registro Válido', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('Registro Inválido', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    expect(app).toBeFalsy();
  });

  it('Formulario Inválido(rut)', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let rut = app.usuario.controls['rut'];
    rut.setValue('10.220.679-4');

    expect(app.usuario.invalid).toBeFalse();
  });

  it('Formulario Inválido(Nombre)', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let nombre = app.usuario.controls['nombre'];
    nombre.setValue('Alanbrito');

    expect(app.usuario.invalid).toBeFalse();
  });

  it('Formulario Inválido(apellido)', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let apellido = app.usuario.controls['apellido'];
    apellido.setValue('Gajardo');

    expect(app.usuario.invalid).toBeFalse();
    
  });

  
  it('Formulario inválido(fecha nacimiento)', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let fechaNacimiento = app.usuario.controls['fechaNacimiento'];
    fechaNacimiento.setValue('12/15/202020');

    expect(app.usuario.invalid).toBeFalse();
  });


  it('Formulario Inválido(correo)', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let correo = app.usuario.controls['correo'];
    correo.setValue('alabritodelgadity@duocuc.cl');

    expect(app.usuario.invalid).toBeFalse();


    
  });


  it('Formulario Inválido(clave)', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let clave = app.usuario.controls['clave'];
    clave.setValue('alambritodelgado');

    expect(app.usuario.invalid).toBeFalse();
  
  });


  it('Formulario Inválido(repetir clave)', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let repetirClave = app.usuario.controls['repetirClave'];
    repetirClave.setValue('alambritosprite');

    expect(app.usuario.invalid).toBeFalse();
  });


  it('Formulario Válido', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nombre'];
    let apellido = app.usuario.controls['apellido'];
    let fechaNacimiento = app.usuario.controls['fechaNacimiento'];
    let correo = app.usuario.controls['correo'];
    let clave = app.usuario.controls['clave'];
    let repetirClave = app.usuario.controls['repetirClave'];


    rut.setValue('12.450.550-3');
    nombre.setValue('Jorge');
    apellido.setValue('Rojas');
    fechaNacimiento.setValue('01/03/1999');
    correo.setValue('jrojas@duocuc.cl');
    clave.setValue('jorgechevere');
    repetirClave.setValue('jorgechevere');


    expect(app.usuario.valid).toBeTrue();
  });


it('Testear el botón de registro sea incorrecto')
  const fixture = TestBed.createComponent(RegistroPage);
  const app = fixture.componentInstance;

  let rut = app.usuario.controls['rut'];
  let nombre = app.usuario.controls['nombre'];
  let apellido = app.usuario.controls['apellido'];
  let fechaNacimiento = app.usuario.controls['fechaNacimiento'];
  let correo = app.usuario.controls['correo'];
  let clave = app.usuario.controls['clave'];
  let repetirClave = app.usuario.controls['repetirClave'];

  
  rut.setValue('12.450.550-367789-4');
  nombre.setValue('Matilda');
  apellido.setValue('sin apellido');
  fechaNacimiento.setValue('01/03/20000');
  correo.setValue('matilda@avionsito.cl');
  clave.setValue('matilda123');
  repetirClave.setValue('123matilda');

  app.registrar();

  expect(app.is_register).toBeFalse();
});


it('Testear el botón de registro sea correcto')
  const fixture = TestBed.createComponent(RegistroPage);
  const app = fixture.componentInstance;

  let rut = app.usuario.controls['rut'];
  let nombre = app.usuario.controls['nombre'];
  let apellido = app.usuario.controls['apellido'];
  let fechaNacimiento = app.usuario.controls['fechaNacimiento'];
  let correo = app.usuario.controls['correo'];
  let clave = app.usuario.controls['clave'];
  let repetirClave = app.usuario.controls['repetirClave'];

  
  rut.setValue('12.450.550-3');
  nombre.setValue('Jorge');
  apellido.setValue('Rojas');
  fechaNacimiento.setValue('01/03/1999');
  correo.setValue('jrojas@duocuc.cl');
  clave.setValue('jorgechevere');
  repetirClave.setValue('jorgechevere');

  app.registrar();

  expect(app.is_register).toBeTrue();

