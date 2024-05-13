import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favCart: Product[] = [];

  addFav(product: Product): void {
    this.favCart.push(product);
    console.log('productos favoritos: -->', this.favCart);
  };

  getFav(): Product[] {
    return this.favCart.slice();
  }
}
