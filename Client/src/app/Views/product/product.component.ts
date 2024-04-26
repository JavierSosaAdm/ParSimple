import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CardComponent } from '../../Components/card/card.component'
import { FormsModule } from '@angular/forms';
import { CardsComponent } from '../../Components/cards/cards.component';





@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductsComponent implements OnInit {
  ProductList: { id: string, data: Product }[] = [];
  searchName: string = '';
  
  
  private _fireService = inject(FireService)
  private _ProductService = inject(ProductService);
  private _router = inject(Router);
  
  
  ngOnInit(): void {
    this._fireService.getProductsFire().subscribe((data) => {
      this.ProductList = data
      console.log(this.ProductList);  
    });  
  }
  
  navegate(product: { id: string, data: Product }): void {
    if (product) {
      this._router.navigate(['/detail', product.id])
      // console.log();
      
    } else {
      console.error('Producto inválido o ID faltante');
    }
  }
  
  // searchProduct(): void {
  //   this._ProductService.getProductsByName(this.searchName).subscribe((data: Product[]) => {
  //     this.ProductList = data;
      
  //   })
  // }
  
}

// this._ProductService.getProducts().subscribe((data: Product[]) => {
//   this.ProductList = data  
//   console.log(this.ProductList);
// })