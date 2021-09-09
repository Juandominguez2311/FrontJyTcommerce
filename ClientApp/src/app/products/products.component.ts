import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  constructor(private servicioListado: ProductsService) { }
  public ListadoProductos: Product[] = [];
  public UnProducto: Product;
  public campobuscado: string;

  ngOnInit() {
    this.CargarListado()

  }

  CargarListado() {

    this.servicioListado.MostrarTodos().subscribe(
      data => {
        console.log(data)
        console.log("//**")
        this.ListadoProductos = data;

      }
    );
  }
}
