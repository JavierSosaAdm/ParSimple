import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsCart: Product[] = [];
  
  addProdCart(product: Product): void {
    this.itemsCart.push(product)
    // console.log('aqui los productos de carrito: ->', this.itemsCart);
    
  }

  getCartItems(): Product[] {
    return this.itemsCart.slice();
  }

  removeCart(product: Product, id: string): void {
    
  };
}
