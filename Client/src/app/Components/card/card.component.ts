import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../../Services/cart.service';
import { FavoritesService } from '../../Services/favorites.service';
import { Cart } from '../../models/cart.model';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() product?: { id: string; data: Product};
  loading: boolean = true;
  
  favorites?: {id: string; data: Product};
  private _fireService = inject(FireService)
  private _router = inject(Router);
  private _ProductService = inject(ProductService)
  private _cartService = inject(CartService);
  private _favService = inject(FavoritesService);
  public sanitizer = inject(DomSanitizer);
  menuSelected: string = '';
  
  
  verDetail(): void {
    if (this.product && this.product.id) {
      const productId = this.product.id;
      // console.log(productId);
      this._router.navigate(['/products',productId]) // hacer el get product by id 
      
    } else {
      console.error('Producto inválido o ID faltante');
    }
  }
  
  addCart(): void {
    
    if (this.product && this.product.id) {
      let data: Cart = {
        id_Cart: this.product.id,
        products: this.product.data,
        product_quantity: 1,
        total_price: this.product.data.price
      }
      this._cartService.addProdCart(data) 
      console.log('esto es data del addCart', data);
      
    } else {
      console.log('no hay producto en el carrito');
    }
    
    
  }
  // this._cartService.addProdCart() : console.error('No hay producto');
  
  addFav(): void {
    this.product ? this._favService.addFav(this.product.data) : console.error('No favorites');
  };
    
  ngOnInit(): void { 
    // console.log('producto de la card:', this.product);
  }
}

