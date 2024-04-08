import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductsComponent implements OnInit {
  ProductList: Product[] = [];

  private _ProductService = inject(ProductService);
  private _router = inject(Router);

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe((data: Product[]) => {
      console.log(data);
      this.ProductList = data  
    });  
  }
  navegate(id: string): void {
    this._router.navigate(['/products', id]);
  }
}
