import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, finalize, from, map, switchMap, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { enviroment } from '../../../enviroment.prod';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { v4 as uuidV4 } from 'uuid';
import { catchError, of } from 'rxjs';
import { doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  private _http = inject(HttpClient);
  private storage: AngularFireStorage;
  private firestore: AngularFirestore;
  private productCollection: AngularFirestoreCollection<Product>;
  products: Observable<{id: string, data: Product, quantity: number | null}[]>;
  
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

  getProductsFire(): Observable<{id: string, data: Product, quantity: number | null} []> {
    return this.products;
  }
  
  upImageProd(image: File): Observable<string> {
    console.log('esto es imagen:', image);
    if (!image) {
      return throwError('No se seleccionó ninguna imagen.');  // Manejar caso sin imagen
    }
    // console.log('AQUI EL NOMBRE DE LA IMAGEN: --->', image.name);
    // const filenameWithExtension = `<span class="math-inline">\{image\.name\}\.</span>{this.getExtension(image)}`;
    if (!image.name) {
      const filename: string = 'imageName';
      const filePath = `products/${this.generateUniqueFileName(filename)}`;
      const imgRef = this.storage.ref(filePath);
      
      return from(imgRef.put(image)).pipe(
        switchMap(() => imgRef.getDownloadURL()), // Encadenar con getDownloadURL
        map((downloadURL: string) => {
          const FireURL = `${downloadURL}`;
          return FireURL;
        })
      );
    } else {
      const filename: string = image.name;
      const filePath = `products/${this.generateUniqueFileName(filename)}`;
      const imgRef = this.storage.ref(filePath);
      
      return from(imgRef.put(image)).pipe(
        switchMap(() => imgRef.getDownloadURL()),
        map((downloadURL: string) => {
          const FireURL = `${downloadURL}`
          return FireURL;
        })
      );
    }

  }
  
  getExtension(image: File): string {
    const mimeType = image.type;
    if (mimeType) {
      const extension = mimeType.split('/')[1];
      return extension;
    } else {
      // Handle cases where mimeType is not available
      // You might return a default extension or throw an error
      return 'jpg'; // Example: Assuming images might be JPEG by default
    }
  }
  
  private generateUniqueFileName(filename: string): string {
    const parts = filename;
    console.log(filename);
    
    const extention = parts?.length > 1 ? parts[parts.length -1] : '';
    return `${uuidV4()}.${extention}`;
  }
  
  addProduct(product: Product): Promise<void> {
    const refProd = this.firestore.collection('products').doc(product.id_product || uuidV4())
    return refProd.set(product)
  }
  getProductByIdFire(productId: string): Observable<Product | undefined> {
    const productRef = this.firestore.collection('products').doc(productId);
    return productRef.get().pipe(
      map(docSnapshot => docSnapshot.exists ? docSnapshot.data() as Product : undefined)
      
    );
  }
  
}
