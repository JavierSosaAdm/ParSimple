import { inject, Injectable, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FireService } from './fire.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _productListSource = new BehaviorSubject<{ id: string, data: Product }[]>([]);
  private _fireService = inject(FireService)
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
    // console.log('esto me llega a categoria',this.selectedCategory);
    // this.filter();
    
  }
  filterSize (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value; 
    this.selectedSize = selectedValue
    // console.log('esto me llega a Size',this.selectedSize);
    // this.filter()
  }
  filterType (event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.selectedType = selectedValue
    // console.log('esto me llega a Type',this.selectedType);
    // this.filter()
  }
  filterMin (event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.minPrice = Number(selectedValue);
    // console.log('minPrice', this.minPrice);
    
    // this.filter();
  }
  filterMax (event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.maxPrice = Number(selectedValue);
    // console.log('maxPrice', this.maxPrice);
    
    // this.filter();
  }
  // console.log('Esto es los resultados de los filtros: ', matchSize && matchType && matchCategory && matchMinPrice && matchMaxPrice);

  filter(): any {
    // console.log('estos son los filtros enviados: ', this.selectedCategory, this.selectedSize, this.selectedType, this.maxPrice, this.maxPrice);
    // console.log('este es el productList del servicio: ', this.ProductList);
    this._fireService.getProductsFire().subscribe((data) => {
      this.ProductList = data
      console.log('ProductList en filter previo al filtrado: ',this.ProductList);  
    })
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
    // console.log('Productos filtrados:', filteredProducts);
    return filteredProducts
  };

  paginate() {
    for (let i = 0; i < this.ProductList.length; i++) {
       if (this.totalItems < this.itemsPerPage) {
          this.page.push(this.ProductList[i])
          this.currentPage++
       }
    };
  }
  
}
