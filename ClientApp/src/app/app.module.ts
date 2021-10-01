import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductsComponent } from './products/products.component';
import { ObjToArrayPipe } from './products/objToArray.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CrudproductosComponent } from './backoffice/crudproductos/crudproductos.component';
import { FormularioProductosComponent } from './backoffice/formulario/formulario-productos/formulario-productos.component';
import { CardsComponent } from './products/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProductsComponent,
    ObjToArrayPipe,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    CrudproductosComponent,
    FormularioProductosComponent,
    CardsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'productos', component:ProductsComponent},
      { path: 'productos-cards/:id', component: CardsComponent},
      { path: 'cart',component:CartComponent},
      { path: 'checkout',component:CheckoutComponent},
      { path: 'boproductos',component:CrudproductosComponent},
      { path: 'producto-editar/:id',component:FormularioProductosComponent},
      { path: 'producto-nuevo',component:FormularioProductosComponent},


    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
