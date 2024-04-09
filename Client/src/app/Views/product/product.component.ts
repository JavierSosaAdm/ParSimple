import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CardComponent } from '../../Components/card/card.component'
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductsComponent implements OnInit {
  ProductList: Product[] = [];
  searchName: string = '';
  

  private _ProductService = inject(ProductService);
  private _router = inject(Router);

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe((data: Product[]) => {
      this.ProductList = data  
      
      console.log(this.ProductList);
    });  
  }
  navegate(id: string): void {
    this._router.navigate(['/products', id]);
  }
  
  searchProduct(): void {
    this._ProductService.getProductsByName(this.searchName).subscribe((data: Product[]) => {
      this.ProductList = data;
      
    })
  }
  
}
