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

  deleteFav(id: string) {
    this. favCart = this.favCart.filter((product) => product.id_product !== id);
  }
  getFav(): Product[] {
    return this.favCart.slice();
  }
}
