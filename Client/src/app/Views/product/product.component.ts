import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CardComponent } from '../../Components/card/card.component'
import { FormsModule } from '@angular/forms';

import { FilterService } from '../../Services/filter.service';
import { Observable, of } from 'rxjs';
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
  
  private _fireService = inject(FireService);
  private _ProductService = inject(ProductService);
  private _PaginateService = inject(PaginateService);
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
  totalPages$ = this._PaginateService._totalPages;

  
  ngOnInit (): void {
    this._fireService.getProductsFire().subscribe((data) => { // Solicitud de productos
      this.ProductList = data
      console.log('productos listos: ', this.ProductList);
      console.log('productos listos: ', this.ProductList);
      this._filter.filter(); 
      this._PaginateService.setTotalItems(data.length, this.ProductList); // Se setea los prod del paginado
      this._PaginateService.getPaginatedData().subscribe(paginatedData => { // se realiza el paginado               
        this.paginatedProducts = paginatedData; // 
        this.ProductList = this.paginatedProducts;             
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
      this._ProductService.getProductByNameFire(searchName).subscribe(async (products) => { 
        this.ProductList = await products.filter((product) => product.id !== ''); // Se filtra por id con el nombre de parametro
        console.log('productos listos: ', this.ProductList);
        this._PaginateService.setTotalItems(this.ProductList.length, this.ProductList); // Se setea los prod del paginado otra vez
        this._PaginateService.getPaginatedData().subscribe(paginatedData => { // se vuelve a paginar pero ya con los valores actuales despues de la busqueda            
          this.paginatedProducts = paginatedData; 
          this.ProductList = this.paginatedProducts;             
        });  
      });
    } else {
      this._fireService.getProductsFire().subscribe((data) => {
        this.ProductList = data;
        this._PaginateService.setTotalItems(this.ProductList.length, this.ProductList); // Se setea los prod del paginado otra vez
        this._PaginateService.getPaginatedData().subscribe(paginatedData => { // se vuelve a paginar pero ya con los valores actuales despues de la busqueda            
          this.paginatedProducts = paginatedData; 
          this.ProductList = this.paginatedProducts;             
        });  
      });
    }
    console.log('productos listos: ', this.ProductList);
    
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

 async filter () {
  this.ProductList = await this._filter.filter()
  this._PaginateService.setTotalItems(this.paginatedProducts.length, this.ProductList);
  this._PaginateService.getPaginatedData().subscribe(paginatedData => {
    console.log('esto es pagination data', paginatedData);              
    this.paginatedProducts = paginatedData; // Ejemplo de uso
    this.ProductList = this.paginatedProducts;             
  });
 };

 changePage(page: number) {
   this._PaginateService.setCurrentPage(page);
   this.page = page;
  };
};
