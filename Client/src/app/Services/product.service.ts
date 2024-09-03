import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';
import { Product } from '../models/product.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _http = inject(HttpClient)
  private baseURL: string = enviroment.apiURL;
  
  private firestore: AngularFirestore;
  private productCollection: AngularFirestoreCollection<Product>;
  products: Observable<{id: string, data: Product}[]>;

  constructor( firestore: AngularFirestore ) {
    this.firestore = firestore;
    this.productCollection = firestore.collection<Product>('products');
    this.products = this.productCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Product>[]) => 
        actions.map((a) => {
          const { payload } = a; // Destructurar payload
          const data = payload.doc.data() as Product; // Castear data como Producto
          const id = payload.doc.id;
          
          return { id, data };
        } ))
      );
    }
  
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseURL}/products`);
  }

  getProductsById(id: string): Observable<Product> {
    return this._http.get<Product>(`${this.baseURL}/products/${id}`);
 }
 
  getProductsByName(name: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.baseURL}/products?name=${name}`);
  }

  getProductByNameFire(name: string): Observable<{ id: string; data: Product;}[]> {
    return this.productCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Product>[]) =>
        actions.map((a) => {
          const { payload } = a;
          const data = payload.doc.data() as Product;
          const id = payload.doc.id;

          // Filtrar por nombre
          if (data.name.toLowerCase().includes(name.toLowerCase())) {
            return { id, data };
          } else {
            return { id: '', data }; // Excluir productos que no coincidan con el nombre
          }
        })
        .filter((product) => product !== undefined) // Eliminar elementos nulos
      )
  
    );   
  }

  postProduct(data: Product): Observable<Product> {
   console.log(data);
    return this._http.post<Product>(`${this.baseURL}/products`, data);
  }
 
}
