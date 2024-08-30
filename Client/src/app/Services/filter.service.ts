import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FireService } from './fire.service';
import { PaginateService } from './paginate.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _productListSource = new BehaviorSubject<{ id: string, data: Product }[]>([]);
  private _fireService = inject(FireService)
  private _PaginateService = inject(PaginateService)
  productList$: Observable<{ id: string, data: Product }[]> = this._productListSource.asObservable();
  ProductList: { id: string, data: Product }[] = [];
  selectedCategory: string | null   = 'Todos';
  selectedSize: string | null = '';
  selectedType: string | null = 'Todos';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  currentPage: number = 0;
  totalItems: number = this.ProductList.length;
  itemsPerPage: number = 2;
  totalPage: number = Math.ceil(this.totalItems / this.itemsPerPage);
  private _page = new BehaviorSubject<[]>([]);
  page$: Observable<{ id: string, data: Product }[]> = this._page.asObservable();
  page: { id: string, data: Product }[] = [];
  
  filterCategory (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.selectedCategory = selectedValue
  }

  filterSize (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value; 
    this.selectedSize = selectedValue
  };
    
  filterType (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.selectedType = selectedValue
  };
    
  filterMin (event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.minPrice = Number(selectedValue);
  };
  
  filterMax (event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.maxPrice = Number(selectedValue);
  };
  
  filter(): any {
    this._fireService.getProductsFire().subscribe((data) => {
      this.ProductList = data 
    })
    const filteredProducts = this.ProductList.filter((product) => {
      const matchSize = this.selectedSize ? product.data.size === this.selectedSize : true;
      const matchType = product.data.type === this.selectedType || this.selectedType === 'Todos' 
      const matchCategory = product.data.category === this.selectedCategory || this.selectedCategory === 'Todos'
      const matchMinPrice = this.minPrice !== null ? product.data.price >= this.minPrice : true;
      const matchMaxPrice = this.maxPrice !== null ? product.data.price <= this.maxPrice : true;
        
      return  matchSize && matchType && matchCategory && matchMinPrice && matchMaxPrice
      
    });
    this._productListSource.next(filteredProducts);
    return filteredProducts
  }; 

}
