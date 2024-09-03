import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { FireService } from '../../Services/fire.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {
  ProductList: { id: string, data: Product }[] = [];
  // filteredProductList: { id: string, data: Product }[] = [];
  private _fireService = inject(FireService);

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
    
    
    // this.filter();
  }

  filter() {
    this.ProductList = this.ProductList.filter((product) => {
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
      
    })
    console.log('Productos filtrados:', this.ProductList);
  };

  trackByProductId(index: number, product: { id: string, data: Product }) {
    return product.id;
  }
  ngOnInit(): void {
    this._fireService.getProductsFire().subscribe((product) => {
      this.ProductList = product;
      // this.filteredProductList = product;// Inicializar la lista filtrada con todos los productos
      this.filter(); 
    })
  }
}
