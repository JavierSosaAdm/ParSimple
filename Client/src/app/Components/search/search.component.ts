import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { FireService } from '../../Services/fire.service';
import { ProductService } from '../../Services/product.service';
import { Router } from 'express';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  ProductList: { id: string, data: Product }[] = [];
  searchName: string = '';
  
  
  private _fireService = inject(FireService)
  private _ProductService = inject(ProductService);
  private _router = inject(Router);
  searchProduct(searchName: string): void {
    if (searchName) {
      this._ProductService.getProductByNameFire(searchName).subscribe((products) => {
        this.ProductList = products.filter((product) => product.id !== '');
        console.log('esto es products', products);
        
        console.log('esto es lista de productos', this.ProductList);
        
      });
    } else {
      this._fireService.getProductsFire().subscribe((data) => {
        this.ProductList = data
        console.log(this.ProductList);  
      });
    }
  }
}
