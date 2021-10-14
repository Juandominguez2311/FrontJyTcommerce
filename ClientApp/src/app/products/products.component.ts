import {Component, OnInit, Inject, ViewChild, ElementRef,Input} from '@angular/core';
import { Category, Product } from '../models/product';
import { Router,NavigationEnd  } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { ObjToArrayPipe } from './objToArray.pipe';
import {checkoutService} from '../services/checkout.service'
import { get } from 'scriptjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public ProductList: Product[] = []
  public Product: Product
  public campobuscado: string;
  public Category : Category[];  
  public preference : any;
  
  @Input() itemProduct:Product;
  constructor(private servProd: ProductsService, private checkoutService: checkoutService, private router : Router ) { }


  URL="/productos";
  init_point: any;
  ngOnInit() {

    if (this.router.url == this.URL + "/laptops" ){
      this.getByCategory(2)
    }else if(this.router.url == this.URL + "/celulares"){
      this.getByCategory(3)
    }else if(this.router.url == this.URL + "/tvs"){
      this.getByCategory(1)
      
    }else{
      this.CargarListado();
    }
    get("https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js", () => {
      //library has been loaded...
    });
  }
  CargarListado() {
    this.servProd.getAll()
    .subscribe(
      data => {
        this.ProductList = data;
        
      })
  }

  getByCategory(category:number) {
    
    if(category > 0){
      this.servProd.getProductsFromCategory(category)
      .subscribe(
        data => {
          this.ProductList = data;
    })} 
    else{
      
      this.servProd.getAll()
      .subscribe(
        data => {
          this.ProductList = data;
       
      })
    }
   
  }
  serchByName(campobuscado) {
      
    if(this.campobuscado != null && this.campobuscado != "" ){
      this.servProd.serchByName(this.campobuscado).subscribe(
        data => {
          
          this.ProductList = data
        },
        err => console.log(err)
      );
    }else{
      this.CargarListado()
    }
  }
  onBuy() {
    this.checkoutService.goCheckOut(this.preference).subscribe(result => {
      this.init_point = result.data.result;
      console.log(this.init_point);
      window.location.href = this.init_point;
    },err => console.log(err))
    };
}