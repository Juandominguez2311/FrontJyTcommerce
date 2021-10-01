import { Component, OnInit,Input} from '@angular/core';
import { Category, Product } from '../models/product';
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
  public Category : Category[];
  @Input() itemProduct:Product;
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
      })
  }

  getByCategory(category:number) {
    if(category > 0){
      this.servProd.getProductsFromCategory(category)
      .subscribe(
        data => {
          console.log(typeof data)
          console.log("//**")
          this.ProductList = data;
          console.log(typeof this.ProductList)
          console.log(this.ProductList)
    })} 
    else{
      
      this.servProd.getAll()
      .subscribe(
        data => {
          console.log(typeof data)
          console.log("//**")
          this.ProductList = data;
          console.log(typeof this.ProductList)
          console.log(this.ProductList)
      })
    }
   
  }
  serchByName(name:string) {
      
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
}
