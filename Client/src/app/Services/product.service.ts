import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';
import { Product } from '../../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _http = inject(HttpClient)
  private baseURL: string = enviroment.apiURL;
  
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseURL}/products`);
  }

  getProductsById(id: string): Observable<Product> {
    return this._http.get<Product>(`${this.baseURL}/products/${id}`);
 }
 
 getProductsByName(name: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseURL}/products?name=${name}`);
 }
}
