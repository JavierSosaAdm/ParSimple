import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CardComponent } from '../../Components/card/card.component'
import { FormsModule } from '@angular/forms';
// import { CardsComponent } from '../../Components/cards/cards.component';
// import { FiltersComponent } from '../../Components/filters/filters.component';
// import { PaginationComponent } from '../../Components/pagination/pagination.component';
import { FilterService } from '../../Services/filter.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PaginateService } from '../../Services/paginate.service';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductsComponent implements OnInit {
  
  private _fireService = inject(FireService)
  private _ProductService = inject(ProductService);
  private _PaginateService = inject(PaginateService)
  private _router = inject(Router);
  private _filter = inject(FilterService);
  productList$ = this._filter.productList$;
  
  paginatedData$: Observable<{ id: string, data: Product }[]> = of<{ id: string, data: Product }[]>([]);
  
  ProductList: { id: string, data: Product}[] = [];
  searchName: string = '';
  paginatedProducts: { id: string, data: Product}[] = [];
  page: number = 1;
  itemperpag: number = 3;
  totalPage: number = Math.ceil(this.ProductList.length / this.itemperpag);

  currentPage$ = this._PaginateService.currentPage$;
  itemsPerPage$ = this._PaginateService.itemsPerPage$;
  totalItems$ = this._PaginateService.totalItems$;
  totalPages$ = this._PaginateService._totalPages

  // isNextDisabled: boolean = false;
  // isPreviousDisabled: boolean = true;

  ngOnInit (): void {
    this._PaginateService.paginate();
    this._fireService.getProductsFire().subscribe((data) => {
      this.ProductList = data
      this._filter.filter(); 
      this._PaginateService.setTotalItems(data.length);
      this._PaginateService.getPaginatedData().subscribe(paginatedData => {
        console.log('esto es pagination data', paginatedData);              
        this.paginatedProducts = paginatedData; // Ejemplo de uso
        this.ProductList = this.paginatedProducts;
        // this.updateButtonStates();
        console.log('esto es productos despues de paginado', this.paginatedProducts);              
      });
    })
  };
  
  navegate(product: { id: string, data: Product }): void {
    if (product) {
      this._router.navigate(['/detail', product.id])
      // console.log();
      
    } else {
      console.error('Producto inválido o ID faltante');
    }
  };
  
  searchProduct(searchName: string): void {
    if (searchName) {
      this._ProductService.getProductByNameFire(searchName).subscribe((products) => {
        this.ProductList = products.filter((product) => product.id !== '');
        // console.log('esto es products', products);
        
        // console.log('esto es lista de productos', this.ProductList);
        
      });
    } else {
      this._fireService.getProductsFire().subscribe((data) => {
        this.ProductList = data
        // console.log(this.ProductList);  
      });
    }
  };
 // FILTROS
 filterCategory(event: Event) {
  this._filter.filterCategory(event)
 };

 filterSize(event: Event) {
  this._filter.filterSize(event)
 };

 filterType(event: Event) {
  this._filter.filterType(event)
 };

 filterMin(event: Event) {
  this._filter.filterMin(event)
 };

 filterMax(event: Event) {
  this._filter.filterMax(event)
 };

 filter() {
  this.ProductList = this._filter.filter()
 };

 
 
 changePage(page: number) {
   this._PaginateService.setCurrentPage(page);
   this.page = page;
  //  this.updateButtonStates()
   console.log("esto es currentPage: ", page);
  }

  // updateButtonStates() {
  //   this.currentPage$.subscribe(currentPage => {
  //     this.isPreviousDisabled = currentPage === 1;
  //     this.isNextDisabled = currentPage === this._PaginateService.totalPages;
  //   })
  // };
}
