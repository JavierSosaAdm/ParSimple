import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { v4 as uuidV4 } from 'uuid';
import { Observable, from, map } from 'rxjs';
import { DocumentSnapshot } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsCart: Cart [] = [];
  private firestore = inject(AngularFirestore);
  private cartCollection: AngularFirestoreCollection<Cart>;
  public carts: Observable<{id: string, data: Cart}[]>;
  
  constructor( firestore: AngularFirestore ) {
    this.cartCollection = this.firestore.collection<Cart>('cart');
    this.carts = this.cartCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Cart>[]) => 
        actions.map((a) => {
          const { payload } = a; // Destructurar payload
          const data = payload.doc.data() as Cart; // Castear data como Producto
          const id = payload.doc.id;
          return { id, data };
        } ))
      );
  }
  addProdCart(cart: Cart): Observable<void> {
    console.log('se esta agregando la cart a firebase');
    this.itemsCart.push(cart);
    console.log('esto es itemscart',this.itemsCart);
    
    return from(this.firestore.collection('cart').doc(uuidV4()).set(cart))
  }

  getCartItems() {
    return this.itemsCart
  }

  updateQantity(cart: Cart) {
    const cartId = cart.id_Cart || ''; // Obtener el ID del carrito del objeto carrito
    console.log('esto es el id de la cart', cartId);
    
    if (!cartId) {
      throw new Error('Se requiere el ID del carrito para actualizar la cantidad.');
    }
    console.log('esto es cart', cart);
    
    this.itemsCart.forEach((item) => {
      return item.id_Cart !== cartId ? console.log('no hay ID')
      : item.product_quantity = cart.product_quantity
    })

    return this.firestore
      .collection('cart')
      .doc(cartId)
      .update({ quantity: cart.products.quantity }) // Actualizar solo el campo de cantidad
      
  }
};

  // removeCart(id: string) {
  //   // console.log('esto es el id que me pasaron de cart', id);
  //   // const filters = this.itemsCart.filter((item) => item.id !== id)
  //   // return this.itemsCart = filters
  // };
  

