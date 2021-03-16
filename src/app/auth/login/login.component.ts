import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Sweetalert } from '../../function';
import { Router } from '@angular/router';
import { DataService } from '../../services/common/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  numbersPattern = "^[0-9]*$";
  empresa:any;
  
  constructor(
    public fb: FormBuilder,
    private _firebaseService:FirebaseService,
    private router: Router,
    private _data: DataService
  ) { }

  ngOnInit(): void {
    /** validator de registerForm */
    this.registerForm = this.fb.group({
      documento: ['',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
        Validators.pattern(this.numbersPattern),
      ]],
      password: ['',[
        Validators.required,
        Validators.minLength(6),
      ]],
    });
  }

  loginUsuario(){
    if(this.registerForm.invalid){
      return;
    }
    else{
      const{documento, password} = this.registerForm.value;
      console.log(documento,password);
      Sweetalert.fnc("loading", "Cargando...",null);
      this._firebaseService.consultUser(documento).subscribe(resp=>{
        this.empresa = resp;
        if(this.empresa.length == 1 && this.empresa[0].emp_cpassw == password){
          Sweetalert.fnc("close",null,null);
          this._data.logueado = true;
          localStorage.setItem('empresa',JSON.stringify(this.empresa));
          this.router.navigate(['/dashboard']);
        }
        else{
          Sweetalert.fnc("error","El usuario no existe",null);
          this._data.logueado = false;
        }
      })
    }
  }
}
