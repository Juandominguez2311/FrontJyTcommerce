import { Component, OnInit,Input} from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-crudproductos',
  templateUrl: './crudproductos.component.html',
  styleUrls: ['./crudproductos.component.css']
})
export class CrudproductosComponent implements OnInit {

  public ProductList: Product[] = []
  public Product: Product
  public campobuscado: string;
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

  
  
  deleteProduct(id:number){
    console.log(id)
    this.servProd.delete(id)
    .subscribe(
      ()=> this.CargarListado(),
      error=> alert(error),
      ()=>  console.log("borro el Jugador"),
    );
  }
}
