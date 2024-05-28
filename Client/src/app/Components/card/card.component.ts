import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../../Services/cart.service';
import { FavoritesService } from '../../Services/favorites.service';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() product?: { id: string; data: Product; quantity: number;};
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
    // console.log('esto es dataCart: ', this.product?.data);
    this.product && this.product.id ? this._cartService.addProdCart(this.product.data, this.product.id, this.product.quantity) : console.error('No hay producto');
  }

  addFav(): void {
    this.product ? this._favService.addFav(this.product.data) : console.error('No favorites');
  };

  ngOnInit(): void { 
  }
}
