import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router, ParamMap, Routes } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  public arraycompras:any;
  arraycotizaciones:any;
  fecha_actual:any;
  mes;
  current_usuario:any;
  constructor(
    private _firebase: FirebaseService,
    private route: ActivatedRoute, 
    private router: Router,
  ) { 
    this.fecha_actual = Date.now();
    this.mes = this.fecha_actual - 2592000000;
  }

  ngOnInit(): void {
    /** array donde se almacena ventas / ventas */
    this._firebase.arrayComprasVentas().subscribe(resp=>{
      this.arraycompras = resp;
      console.log(this.arraycompras);
    });

    /** array donde se almacena ventas/ cotizaciones */
    this._firebase.arrayComprasCotizaciones().subscribe(resp=>{
      this.arraycotizaciones = resp;
      this.arraycotizaciones = this.arraycotizaciones.filter((data:any)=>(data.cotiz_dfech_emi.toMillis() >= this.mes));
      console.log(this.arraycotizaciones);
    });

    this._firebase.consultarUser().subscribe(resp=>{
      this.current_usuario = resp[0];
      console.log(this.current_usuario)
    });
  }
  
  mostrarCompras(){
    this.router.navigate(['miscompras'], {relativeTo:this.route});
  }

  mostrarCotizaciones(){
    this.router.navigate(['miscotizaciones'], {relativeTo:this.route});
  }
}