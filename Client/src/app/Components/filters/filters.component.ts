import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { FireService } from '../../Services/fire.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {
  ProductList: { id: string, data: Product }[] = [];
  filteredProductList: { id: string, data: Product }[] = [];
  private _fireService = inject(FireService);

  selectedCategory: string | null = 'Todos';
  selectedSize: string | null = '';
  selectedType: string | null = 'Todos';
  maxPrice: number | null = null;
  minPrice: number | null = null;

  filterCategory (category: string) {
    category ? this.selectedCategory = category : this.selectedCategory = null;
    this.filter();
  }
  filterSize (size: string) {
    size ? this.selectedSize = size : this.selectedSize = null;
    this.filter();
  }
  filterType (type: string) {
    type ? this.selectedType = type : this.selectedType = null;
    this.filter();
  }
  filterMin (price: string) {
    this.minPrice = price ? Number(price) : null;
    this.filter();
  }
  filterMax (price: string) {
    this.maxPrice = price ? Number(price) : null;
    this.filter();
  }

  filter() {
    this.filteredProductList = this.ProductList.filter((product) => {
      const matchCategory = this.selectedCategory !== null ? product.data.category === this.selectedCategory : this.selectedCategory === 'Todos';
      const matchSize = this.selectedSize ? product.data.size === this.selectedSize : !this.selectedSize;
      const matchType = this.selectedType !== null ? product.data.type === this.selectedType : this.selectedType === 'Todos';
      const matchMinPrice = this.minPrice !== null ? product.data.price >= this.minPrice : this.minPrice === null;
      const matchMaxPrice = this.maxPrice !== null ? product.data.price <= this.maxPrice : this.maxPrice === null;
      const matchProducts = matchCategory || matchSize || matchType || matchMaxPrice || matchMinPrice;
      console.log('Esto es productos filtrados: ', this.filteredProductList);
      console.log('esto es el resultado del filtro: ', matchProducts);
      
      
      return matchProducts;
    })
  };
  ngOnInit(): void {
    this._fireService.getProductsFire().subscribe((product) => {
      this.ProductList = product
    })
  }
}
