import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  empresa:any=[];
  productos:any=[];
  config:any;
  collection = { count:60, data:[]};
  closeResult = "";
  productoForm: FormGroup; 
  constructor(
    private _firebase: FirebaseService,
    private modalService: NgbModal,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    /** formulario producto*/ 
    this.productoForm = this.fb.group({
      codigo: [''],
      descripcion: ['',Validators.required],
      marca: ['',Validators.required],
      peso: ['',Validators.required],
      medida: ['',Validators.required],
      stock: ['',Validators.required],
      pv1: ['',Validators.required],
      pv2: ['',Validators.required],
      pv3: ['',Validators.required],
      categoria: ['',Validators.required],
    });

    /** hacer la consulta de del usuario */
    this._firebase.consultarUser().subscribe(resp=>{
      this.empresa = resp[0];
      this.productos = this.empresa.emp_aprod;
      //console.log(this.productos[0].prod_cimg);
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.productos.length
        
      };
      
    })
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
