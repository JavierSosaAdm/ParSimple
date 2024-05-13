import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FavoritesService } from '../../Services/favorites.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  @Input() product?: { id: string; data: Product };
  private _favService = inject(FavoritesService);
  favorites: Product[] = [];

  ngOnInit(): void {
    this.favorites = this._favService.getFav();
    console.log('estos son los favoritos: -->', this.favorites);
    
  }
  
}
