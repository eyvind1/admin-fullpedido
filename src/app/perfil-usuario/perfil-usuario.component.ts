import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  empresa:any;
  empresaForm: FormGroup;
  lettersPattern = "^[a-zA-Z0-9]$";
  constructor(
    private _firebase:FirebaseService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    /** consultar por la empresa */
    this._firebase.consultarUser().subscribe(resp=>{
      this.empresa = resp[0];
    });

    /** formulario de empresa */
    this.empresaForm = this.fb.group({
      /*razonSocial: [''],
      nombreComercial:[''],
      ruc:[''],]
      contraseña:[''],
      descripción:[''],*/
      email:[''],
      telefono:[''],
      direccion:[''],
      departamento:[''],
      provincia:[''],
      distrito:[''],
    });
    
  }
 /*  setDefault(){
    let datosEmpresa = {
      razonSocial: this.empresa.emp_crass,
    };
    this.empresaForm.patchValue(datosEmpresa);
  } */
  actualizarEmpresa(){
    console.log(this.empresaForm.value);
  }
}
