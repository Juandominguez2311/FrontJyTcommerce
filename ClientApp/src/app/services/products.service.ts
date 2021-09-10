import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL : string='http://localhost:9099/api/product/'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    const headers={
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'http://localhost:4200',
      'Access-Control-Allow-Methods': 'POST, PUT, GET, DELETE',
    }
    return this.http.get<any>(this.apiURL+1);

  }
  MostrarPorId(id:number): Observable<Product>{
    return this.http.get<Product>(this.apiURL + "/" +id);
  }

  BuscarPorNombre(nombre:string):Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL+"busquedanombre?palabra=" + nombre);
  }
}
