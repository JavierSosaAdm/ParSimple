import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, from, map, throwError } from 'rxjs';
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

  getProductsFire(): Observable<{id: string, data: Product} []> {
    return this.products;
  }

  // getProductByName(name: string): Observable<Product[]> {
  //   return 
  // }
  upImageProd(image: File): Observable<any> {
    
      const filePath = `productos/${this.generateUniqueFilename(image.name)}`;
      const imgRef = this.storage.ref(filePath);
  
      return imgRef.put(image).snapshotChanges().pipe(
        map(snapshot => { 
          const progress = snapshot? (snapshot.bytesTransferred / snapshot.totalBytes) * 100 : 0;
          return {progress};
        }
        ),catchError(error =>{
              console.log('Error al subir imagen:', error);
              return throwError('Error al subir imagen');
            }),
          finalize(() => imgRef.getDownloadURL())
          );
  }
  addProduct(product: Product): Promise<void> {
    const refProd = this.firestore.collection('products').doc(product.id_product || uuidV4())
    return refProd.set(product)
  }
 
  private generateUniqueFilename(filename: string): string {
    const extention = filename.split('.').pop();
    return `${uuidV4()}.${extention}`;
  }
  
  getProductByIdFire(productId: string): Observable<Product | undefined> {
    const productRef = this.firestore.collection('products').doc(productId);
    return productRef.get().pipe(
      map(docSnapshot => docSnapshot.exists ? docSnapshot.data() as Product : undefined)
      
    );
  }
  
  postProductFire(product: Product): Observable<void> {
    return from(this.firestore.collection('products').doc(product.id_product || uuidV4()).set(product));
  }
  // postProductFire(product: Product): Promise<void> {
  //   try {
  //     product.id_product = product.id_product || uuidV4();
  //     const productRef = this.firestore.collection('products').doc(product.id_product || uuidV4());
  //     return productRef.set(product); // Use productRef here
  //   } catch (error) {
  //     console.error('Error al agregar producto:', error);
  //     return Promise.reject(error);
  //   }
  // }
}

