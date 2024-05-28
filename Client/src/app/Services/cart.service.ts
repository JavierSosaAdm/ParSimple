import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsCart: {product: Product, id: string; quantity: number;} [] = [];
  
  addProdCart(product: Product, id: string, quantity: number): void {
    this.itemsCart.push({product, id, quantity})  
  }

  getCartItems(): {product: Product, id: string; quantity: number;}[] {
    return this.itemsCart.slice();
  }


  removeCart(id: string): {product: Product, id: string; quantity: number;} [] {
    console.log('esto es el id que me pasaron de cart', id);
    const filters = this.itemsCart.filter((item) => item.id !== id)
    return this.itemsCart = filters
  };
  
}
