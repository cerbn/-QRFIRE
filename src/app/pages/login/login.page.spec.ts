import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async } from '@firebase/util';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

/* describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); */

describe('Página Login',() => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],

      declarations: [
        LoginPage
      ]

    }).compileComponents();
  });

  it('Compilación de la página login', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });


  it('Formulario Inválido(Correo)', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.usuario.controls['correo'];
    correo.setValue('admin@admin.cl');

    expect(app.usuario.invalid).toBeTrue();


  });

  it('Formulario Inválido(Clave)', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let clave = app.usuario.controls['clave'];
    clave.setValue('Administrador');

    expect(app.usuario.invalid).toBeTrue();
  });


  it('Formulario Válido', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.usuario.controls['correo'];
    let clave = app.usuario.controls['clave'];

    correo.setValue('admin@admin.cl');
    clave.setValue('Administrador');

    expect(app.usuario.invalid).toBeFalse();
    
  });

  it('Testear el botón de login sea correcto', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.usuario.controls['correo'];
    let clave = app.usuario.controls['clave'];

    correo.setValue('admin@admin.cl');
    clave.setValue('Administrador');

    app.ingresar();

    expect(app.is_logued).toBeTrue();
  });

  it('Testear el botón de login sea incorrecto', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.usuario.controls['correo'];
    let clave = app.usuario.controls['clave'];

    correo.setValue('administradorchevere@profesorrosa.cl');
    clave.setValue('admin');

    app.ingresar();

    expect(app.is_logued).toBeTrue();
  });

});
