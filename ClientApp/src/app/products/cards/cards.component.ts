import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductsService} from "src/app/services/products.service";
import { Product } from 'src/app/models/product';
import {checkoutService} from '../../services/checkout.service'
import { get } from 'scriptjs';
import {AppComponent} from '../../app.component'
import {map} from "rxjs/operators";
import { CargarScriptsService} from "../../services/cargar-scripts.service"
declare function MercadopagoComprar():void
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements /*AfterViewInit,*/OnInit {
  id: Number;
  product;
  
  
  public preference : any;
  constructor(private route: ActivatedRoute,
    private productService: ProductsService, private checkoutService: checkoutService, private cargarService: CargarScriptsService ) {}

    searchKey:string = "";
    init_point: any;
  ngOnInit(): void {
    
    this.cargarService.Cargar(['mercadopagojs'])

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
  onBuy(){
    MercadopagoComprar()
  }
}
