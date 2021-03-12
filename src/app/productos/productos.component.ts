import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductoModel } from '../models/producto';
import { FirebaseStorageService } from '../services/firebase-storage.service';
import { UnidadMedidaService } from '../services/unidad-medida.service';
import { finalize, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  empresa:any=[];
  productos:any=[];
  codigos:any=[];
  medidas:any;
  config:any;
  collection = { count:60, data:[]};
  closeResult = "";
  productoForm: FormGroup; 
  files: File[]=[];
  lettersPattern = "^[a-zA-Z0-9]$";
  numbersPattern = "^[0-9]*$";
  matcher = new MyErrorStateMatcher();
  producto: ProductoModel;
  model = null; // modulo dropzone 
  errorImagen = "";
  errorCodigo = false;
  lengthId = 10;
  public pathStorage = "Gmtc_producto/";
  public urlFirestore= "https://storage.googleapis.com/gmtc-74128.appspot.com/";
  public finalizado = false;
  constructor(
    private _firebase: FirebaseService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private _firebaseStorage: FirebaseStorageService,
    private _unidadmedida: UnidadMedidaService,
  ) {
    this.producto = new ProductoModel();
   }

  ngOnInit(): void {
    /** obtener las unidades de medida */
    this.medidas = this._unidadmedida.getUnidadMedidas(); 
    /** formulario producto*/ 
    this.productoForm = this.fb.group({
      codigo: ['',[
        Validators.maxLength(10)
      ]],
      descripcion: ['',[
        Validators.required,
      ]],
      marca: ['',Validators.required],
      peso: ['',[
        Validators.required,
        Validators.pattern(this.numbersPattern)
      ]],
      medida: ['',Validators.required],
      stock: ['',[
        Validators.required,
        Validators.pattern(this.numbersPattern)
      ]],
      pv1: ['',[
        //Validators.required,
        Validators.pattern(this.numbersPattern)
      ]],
      pv2: ['',[
        //Validators.required,
        Validators.pattern(this.numbersPattern)
      ]],
      pv3: ['',[
        //Validators.required,
        Validators.pattern(this.numbersPattern)
      ]],
      categoria: ['',[
        Validators.required]],
    });

    /** hacer la consulta del usuario */
    this._firebase.consultarUser().subscribe(resp=>{
      this.empresa = resp[0];
      this.productos = this.empresa.emp_aprod;
      //console.log(this.productos[0].prod_cimg);
    });
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.productos.length,
    };

  }
  /** funcion de pagination */
  pageChanged(event){
    this.config.currentPage = event;
  }

  /** funciones del modal crear */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /** funciones del modal editar */
  openEditar(content, item:any) {
    //this.files.push(item.prod_cimg); 
    //console.log(item.prod_cimg);
    /** llenar form para editar */
    this.productoForm.setValue({
      codigo: item.prod_ccod,
      marca: item.prod_cmarca,
      stock: item.prod_nstock,
      descripcion: item.prod_cdesc,
      medida: item.umed_ccods,
      peso: item.prod_npeso,
      pv1: item.prod_nprev1,
      pv2: item.prod_nprev2,
      pv3: item.prod_nprev3,
      categoria: item.prod_ccateg
    });
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
    } 
    else {
      return `with: ${reason}`;
    }
  }

  /** funciones del dropzone img */
  onSelect(event){
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.errorImagen = "Solo una Imagen";
      this.files = [];
      //console.log(this.files[0].type);
    }
    else{
      this.errorImagen = "";
    }
  }
  onRemove(event){
    this.files.splice(this.files.indexOf(event),1);
  }

  /** funcion guardar Producto en firebase */
  guardarProducto(){
    if(this.productoForm.invalid){
      return;
    }
    else{
      //console.log(this.productoForm);
      const{ 
        codigo,
        marca,
        stock,
        descripcion,
        medida,
        peso,
        pv1,
        pv2,
        pv3,
        categoria
      } = this.productoForm.value;
      let codigo_random;
      if (codigo.length == 0) {
        codigo_random = this.makeid(this.lengthId);
        //falta validar el codigo cuando se repite
       /*  codigo_random = 12;
        while (this.buscarCodigoRepetido(codigo_random)==true) {
          codigo_random =this.makeid(this.lengthId);
          console.log("entre");
        } */
        this.producto.prod_ccod = codigo_random;
      } else {
        if(this.buscarCodigoRepetido(codigo)){
          this.errorCodigo = true;
          return;
        }
        else{
          codigo_random = codigo;
          this.producto.prod_ccod = codigo_random;
        }
      }
      if ((this.files.length < 1) ) {
        this.producto.prod_cimg = "";
      } else {
        //let num_random = Math.floor(Math.random() * 6) + 5 ;
        let nombre = this.empresa.emp_cruc + "-"+codigo_random+"-img";
        //let nombreImg = nombre.replace(".","-");
        //console.log(nombre);
        let pathArchivo = this.pathStorage + nombre;
        //console.log(pathArchivo);
        this._firebaseStorage.taskCloudStorage(pathArchivo,this.files[0]);
        this.producto.prod_cimg = this.urlFirestore + pathArchivo;
      } 
      if (this.model == null) {
        this.producto.prod_cfile = "";
      } else {
        //let num_random = Math.floor(Math.random() * 6) + 5 ;
        //let name_random = this.makeid(num_random);
        let nombre = this.empresa.emp_cruc+"-"+codigo_random+"-pdf";
        //console.log(nombre);
        let pathArchivo = this.pathStorage + nombre;
        this._firebaseStorage.taskCloudStorage(pathArchivo,this.model);
        this.producto.prod_cfile = this.urlFirestore + pathArchivo;
      }
      if (pv1 == "") {
        this.producto.prod_nprev1 = 0;
      } else {
        this.producto.prod_nprev1 = parseFloat(pv1);
      }
      if (pv2 == "") {
        this.producto.prod_nprev2 = 0;
      } else {
        this.producto.prod_nprev2 = parseFloat(pv2);
      }
      if (pv3 == "") {
        this.producto.prod_nprev3 = 0;
      } else {
        this.producto.prod_nprev3 = parseFloat(pv3);
      }
      this.producto.prod_activo = true;
      this.producto.prod_cmarca = marca;
      this.producto.prod_nstock = parseFloat(stock);
      this.producto.prod_cdesc = descripcion;
      this.producto.umed_ccods = medida;
      this.producto.prod_npeso = parseFloat(peso);
      
      this.producto.prod_ccateg = categoria;
      //console.log(this.producto);
      console.log(this.empresa);
      //console.log(this.producto);
      /* this._firebase.registrarProducto(this.empresa.propertyId, this.producto).then(resp =>{
        this.productoForm.reset();
        this.modalService.dismissAll();
      }).catch(error =>{
        console.error(error);
      }); */
      
    }
    
  }

  /** getter de productoForm */
  get g () { return this.productoForm.controls; }

  /** codigo alfanumerico */
  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 /** buscar codigo de productos */
 buscarCodigoRepetido(codigo): boolean{
  const codigoExist = this.productos.find((name) => name.prod_ccod === codigo);
  if (codigoExist) {
    return true;
  } else {
    return false;
  }
 }
}
