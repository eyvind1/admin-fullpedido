import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  arrayventas:any;
  arraycotizaciones:any;
  fecha_actual:any;
  mes;
  constructor(
    private _firebase: FirebaseService,
  ) { 
    this.fecha_actual = Date.now();
    this.mes = this.fecha_actual - 2592000000;
  }

  ngOnInit(): void {
    /** array donde se almacena ventas / ventas */
    this._firebase.arrayVentasVentas().subscribe(resp=>{
      this.arrayventas = resp;
      console.log(this.arrayventas);
    });

    /** array donde se almacena ventas/ cotizaciones */
    this._firebase.arrayVentasCotizaciones().subscribe(resp=>{
      this.arraycotizaciones = resp;
      this.arraycotizaciones = this.arraycotizaciones.filter((data:any)=>(data.cotiz_dfech_emi.toMillis() >= this.mes));
      console.log(this.arraycotizaciones);
    })
  }

 

}
