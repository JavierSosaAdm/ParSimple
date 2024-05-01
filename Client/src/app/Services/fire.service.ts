import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, from, map, switchMap, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { enviroment } from '../../../enviroment.prod';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { v4 as uuidV4 } from 'uuid';
import { catchError } from 'rxjs';
import { doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  private storage: AngularFireStorage;
  private firestore: AngularFirestore;
  private productCollection: AngularFirestoreCollection<Product>;
  products: Observable<{id: string, data: Product}[]>;
  
  constructor(storage: AngularFireStorage, firestore: AngularFirestore ) {
    this.storage = storage;
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
  postProductFire(product: Product): Observable<void> {
    return from(this.firestore.collection('products').doc(product.id_product || uuidV4()).set(product));
  }

  getProductsFire(): Observable<{id: string, data: Product} []> {
    return this.products;
  }

  // getProductByName(name: string): Observable<Product[]> {
  //   return 
  // }
  
  upImageProd(image: File): Observable<string> {
    console.log('esto es imagen:', image);
    if (!image) {
      return throwError('No se seleccionó ninguna imagen.');  // Manejar caso sin imagen
    }
    // console.log('AQUI EL NOMBRE DE LA IMAGEN: --->', image.name);
    const filename: string = image.name;
    const filePath = `products/${this.generateUniqueFileName(filename)}`;
    
    const imgRef = this.storage.ref(filePath);
  
    return from(imgRef.put(image)).pipe(
      switchMap(() => imgRef.getDownloadURL())
      
    );
  }
  
  addProduct(product: Product): Promise<void> {
    const refProd = this.firestore.collection('products').doc(product.id_product || uuidV4())
    return refProd.set(product)
  }
 
  private generateUniqueFileName(filename: string): string {
    const parts = filename?.split('.');
    console.log(parts);
    
    const extention = parts?.length > 1 ? parts[parts.length -1] : '';
    return `${uuidV4()}.${extention}`;
  }
  
  getProductByIdFire(productId: string): Observable<Product | undefined> {
    const productRef = this.firestore.collection('products').doc(productId);
    return productRef.get().pipe(
      map(docSnapshot => docSnapshot.exists ? docSnapshot.data() as Product : undefined)
      
    );
  }
  
}
