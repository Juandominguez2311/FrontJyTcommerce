import { Component, OnInit} from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { ObjToArrayPipe } from './objToArray.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public ProductList: Product[] = []
  public Product: Product
  public campobuscado: string;
  constructor(private servProd: ProductsService) { }
  

   
  ngOnInit() {
    this.CargarListado();
  }
  CargarListado() {
    this.servProd.getAll()
    .subscribe(
      data => {
        console.log(typeof data)
        console.log("//**")
        this.ProductList = data;
        console.log(typeof this.ProductList)
        console.log(this.ProductList)
        return this.ProductList
      }),
      error=> alert(error),
      ()=>  console.log("termino")    
  }

  BuscarProducto() { 
    if(this.campobuscado != null && this.campobuscado != "" ){
      this.servProd.BuscarPorNombre(this.campobuscado).subscribe(
        data => {  
          this.ProductList = data
        },
        err => console.log(err)
      );
    }else{
      this.CargarListado()
    }    
  }
}
