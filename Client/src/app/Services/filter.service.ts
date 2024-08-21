import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _productListSource = new BehaviorSubject<{ id: string, data: Product }[]>([]);
  productList$: Observable<{ id: string, data: Product }[]> = this._productListSource.asObservable();
  ProductList: { id: string, data: Product }[] = [];
  selectedCategory: string | null   = 'Todos';
  selectedSize: string | null = '';
  selectedType: string | null = 'Todos';
  maxPrice: number | null = null;
  minPrice: number | null = null;

  filterCategory (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.selectedCategory = selectedValue
    console.log('esto me llega a categoria',this.selectedCategory);
    // this.filter();
    
  }
  filterSize (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value; 
    this.selectedSize = selectedValue
    console.log('esto me llega a Size',this.selectedSize);
    // this.filter()
  }
  filterType (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.selectedType = selectedValue
    console.log('esto me llega a Type',this.selectedType);
    // this.filter()
  }
  filterMin (event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.minPrice = Number(selectedValue);
    console.log('minPrice', this.minPrice);
    
    // this.filter();
  }
  filterMax (event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.maxPrice = Number(selectedValue);
    console.log('miaxrice', this.maxPrice);
    
    // this.filter();
  }

  filter(): any {
    const filteredProducts = this.ProductList.filter((product) => {
      const matchSize = this.selectedSize ? product.data.size === this.selectedSize : true;
      const matchType = product.data.type === this.selectedType || this.selectedType === 'Todos' 
      const matchCategory = product.data.category === this.selectedCategory || this.selectedCategory === 'Todos'
      const matchMinPrice = this.minPrice !== null ? product.data.price >= this.minPrice : true;
      const matchMaxPrice = this.maxPrice !== null ? product.data.price <= this.maxPrice : true;

      // console.log('esto es category: ', matchCategory);
      // console.log('esto es matchSize: ', matchSize);
      // console.log('esto es matchType: ', matchType);
      // console.log('esto es matchMinPrice: ', matchMinPrice);
      // console.log('esto es matchMaxPrice: ', matchMaxPrice);
      
      return  matchSize && matchType && matchCategory && matchMinPrice && matchMaxPrice
      
    });
    this._productListSource.next(filteredProducts);
    console.log('Productos filtrados:', this.ProductList);
  };

  
}
