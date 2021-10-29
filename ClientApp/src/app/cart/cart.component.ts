import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Observable} from "rxjs";
import {CartModel} from "../models/cart";
import { CargarMercadopagoService} from "../services/cargar-mercadopago.service"



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  names : string[]
  cart: CartModel[] = [];
  total: number = 0;
  constructor(public cartService: CartService , private cargarService: CargarMercadopagoService) {cargarService.Cargar(['mercadopagojs'])
  }

  ngOnInit() {
    this.cartService.cart.subscribe(a => this.cart = a);
    this.getTotal();
  }

  getCartProductItems(){
    this.cart = JSON.parse(localStorage.getItem('Cart'));
  }

  onRemoveProductsFromCart(productId: number){
    this.cart = this.cart.filter(a => a.product_id != productId);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.cartService.updateCartItemCount(this.cart.length);
    this.cartService.updateShoppingCart(this.cart);

    this.getTotal();
  }

  onUpdateQuantity(type, productId){
    if(type == 1){
      this.cart.forEach((element, index) => {
        if(element.product_id == productId){
          this.cart[index].quantity = element.quantity + 1;
        }
      });
    } else {
      this.cart.forEach((element, index) => {
        if(element.product_id == productId){
          this.cart[index].quantity = element.quantity - 1;
        }
      });
    }
    this.getTotal();
  }

  getTotal(){
   
    this.cart.forEach((element) => {
      this.total += (element.price*element.quantity);
    })
  }
  deleteMethod(productId:number) {
    if(confirm("Esta seguro de sacar el producto? ")) {
      this.onRemoveProductsFromCart(productId);
    }
  }
}
