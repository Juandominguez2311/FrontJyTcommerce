import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductsService} from "src/app/services/products.service";
import { Product } from 'src/app/models/product';
import {NgxMercadopagoModule } from'ngx-mercadopago'

import {checkoutService} from '../../services/checkout.service'
import { get } from 'scriptjs';
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
  $: any;
  public preference : any;
  constructor(private route: ActivatedRoute,
    private productService: ProductsService, private checkoutService: checkoutService ) { }

    searchKey:string = "";
    init_point: any;
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
        this.preference = prod;
      });
      
    })
    get("https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js", () => {
      //library has been loaded...
    });
  }

  onBuy() {
    this.checkoutService.goCheckOut(this.preference).subscribe(result => {
      this.init_point = result.data;
      console.log(this.init_point);
      window.location.href = this.init_point;
    },err => console.log(err))
    };
  
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