import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { FireService } from '../../Services/fire.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {
  ProductList: { id: string, data: Product }[] = [];
  private _fireService = inject(FireService);

  filterCategory (category: string) {
   if (this.ProductList.length > 0) {
    this.ProductList = this.ProductList.filter((product) => {
      product.data.category !== category
    })
   }
  }
  filterSize (size: string) {
   if (this.ProductList.length > 0) {
    this.ProductList = this.ProductList.filter((product) => {
      product.data.size !== size
    })
   }
  }
  filterType (type: string) {
   if (this.ProductList.length > 0) {
    this.ProductList = this.ProductList.filter((product) => {
      product.data.type !== type
    })
   }
  }
  filterMax (price: number) {
   if (this.ProductList.length > 0) {
    this.ProductList = this.ProductList.filter((product) => {
      product.data.price < price
    })
   }
  }
  filterMin (price: number) {
   if (this.ProductList.length > 0) {
    this.ProductList = this.ProductList.filter((product) => {
      product.data.price > price
    })
   }
  }

  
  ngOnInit(): void {
    this._fireService.getProductsFire().subscribe((product) => {
      this.ProductList = product
    })
  }
}
