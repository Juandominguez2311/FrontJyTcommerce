import { Component, OnInit} from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { ObjToArrayPipe} from '../products/objToArray.pipe'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.css']
})
export class Product2Component implements OnInit {


  constructor(private servProd: ProductsService) { }
  public ProductList$:Observable<any>
  ngOnInit() {
    this.FillList()
    console.log(this.ProductList$)
  }

  FillList(){


    this.ProductList$ = this.servProd.getAll().pipe(map((p)=>{
      return {id:p.product_id, sku:p.sku,name:p.name,image:p.image,price:p.price}
    })
    )
  }
    /*this.servProd.getAll()
    .subscribe(results => this.ProductList$ = results)
    console.log(this.ProductList$)*/
  
}
