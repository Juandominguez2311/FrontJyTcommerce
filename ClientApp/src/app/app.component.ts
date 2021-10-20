import { Component ,OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ProductsService]
})
export class AppComponent implements OnInit {
  mercadoPagoVersion: any;
  title = 'app';
  constructor(private window: Window) {}

  ngOnInit() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js";
    document.body.appendChild(script);

   // this.mercadoPagoVersion.setPublishableKey('TEST-a82c7392-8732-4670-abdf-f1e37a2d442c')
    setTimeout(() => {
      this.mercadoPagoVersion = this.window["Mercadopago"].version;
      console.log(this.window["Mercadopago"]);
    }, 1000);
  }
}
