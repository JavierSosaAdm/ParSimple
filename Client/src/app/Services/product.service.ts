import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';
import { Product } from '../../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    Inject(HttpClient)
  }
  private baseURL: string = enviroment.apiURL;
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL);
  }

  getProductsById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseURL}/${id}`);
 }
 
 getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}?`)
 }
}
