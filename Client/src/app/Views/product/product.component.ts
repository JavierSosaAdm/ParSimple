import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CardComponent } from '../../Components/card/card.component'
import { FormsModule } from '@angular/forms';
import { CardsComponent } from '../../Components/cards/cards.component';
import { FiltersComponent } from '../../Components/filters/filters.component';
import { PaginationComponent } from '../../Components/pagination/pagination.component';
import { FilterService } from '../../Services/filter.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, PaginationComponent, FiltersComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductsComponent implements OnInit {
  ProductList: { id: string, data: Product}[] = [];
  searchName: string = '';
  
  
  private _fireService = inject(FireService)
  private _ProductService = inject(ProductService);
  private _router = inject(Router);
  private _filter = inject(FilterService);
  productList$ = this._filter.productList$;
 
  
  ngOnInit(): void {
    this._fireService.getProductsFire().subscribe(async(data) => {
            this.ProductList = data
            await this._filter.filter();
            // console.log(this.ProductList);  
          })
  }
  
  navegate(product: { id: string, data: Product }): void {
    if (product) {
      this._router.navigate(['/detail', product.id])
      // console.log();
      
    } else {
      console.error('Producto inválido o ID faltante');
    }
  }
  
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
 // FILTROS
 filterCategory(event: Event) {
  this._filter.filterCategory(event)
 }

 filterSize(event: Event) {
  this._filter.filterSize(event)
 }

 filterType(event: Event) {
  this._filter.filterType(event)
 }

 filterMin(event: Event) {
  this._filter.filterMin(event)
 }

 filterMax(event: Event) {
  this._filter.filterMax(event)
 }

 filter() {
  this.ProductList = this._filter.filter()
 }
}