import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductsService} from "src/app/services/products.service";
import { Product } from 'src/app/models/product';
import {checkoutService} from '../../services/checkout.service'
import { get } from 'scriptjs';
import {AppComponent} from '../../app.component'
import {map} from "rxjs/operators";
import { CargarMercadopagoService} from "../../services/cargar-mercadopago.service"


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  id: Number;
  product;
  
  
  public preference : any;
  constructor(private route: ActivatedRoute,
    private productService: ProductsService, private checkoutService: checkoutService, private cargarService: CargarMercadopagoService ) { cargarService.Cargar(['mercadopagojs'])}

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
   


  }

}
