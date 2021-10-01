import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductsService} from "src/app/services/products.service";
import { Product } from 'src/app/models/product';
import {map} from "rxjs/operators";
declare let $: any;

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements AfterViewInit,OnInit {

  id: Number;
  product;
 
  
  constructor(private route: ActivatedRoute,
    private productService: ProductsService,) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        
      });
    })
  }


ngAfterViewInit(): void {

  // Product Main img Slick
  $('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

  }

  
}