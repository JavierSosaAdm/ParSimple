import { inject, Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class PaginateService {
  private _productListSource = new BehaviorSubject<{ id: string, data: Product }[]>([]);
  private _fireService = inject(FireService)
  ProductList: { id: string, data: Product }[] = [];
  productList$: Observable<{ id: string, data: Product }[]> = this._productListSource.asObservable();
  
  private _currentPage = 1;
  private _itemsPerPage = 3;
  private _totalItems = this.ProductList.length;
  private totalPages: number = Math.ceil(this._totalItems / this._itemsPerPage);
  
  public _totalPages = new BehaviorSubject<number>(this.totalPages);
  public currentPage$ = new BehaviorSubject<number>(this._currentPage)
  public itemsPerPage$ = new BehaviorSubject<number>(this._itemsPerPage)
  public totalItems$ = new BehaviorSubject<number>(this._totalItems)

  paginate (): any {
    this._fireService.getProductsFire().subscribe((data) => {
      this.ProductList = data
      console.log('ProductList en paginado previo al laburo: ',this.ProductList); 
    })
  }
  
  getPaginatedData (): Observable<{ id: string, data: Product }[]> {
    this.paginate()
    return combineLatest([this.currentPage$, this.itemsPerPage$, this.ProductList])
      .pipe(
        map(([currentPage, itemsPerPage, ProductList]) => {
          console.log('estos son los valores de prod en la previa', this.ProductList);
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          console.log('estos son los valores de prod', this.ProductList);
          console.log('Estos son los valores: ', this._currentPage, this._itemsPerPage, this._totalItems);
          return this.ProductList.slice(startIndex, endIndex);
        })
      );
  }
 
  previousPage() {
    if (this._currentPage > 1) {
      this.setCurrentPage(this._currentPage - 1);
      console.log('currentPage: ', this._currentPage);
    }
  }

  nextPage() {
    if (this._currentPage < this.totalPages) {
      this.setCurrentPage(this._currentPage + 1)
      console.log('currentPage: ', this._currentPage);
      
    }
  }

  setCurrentPage(page: number) {
    this._currentPage = page;
    this.currentPage$.next(this._currentPage);
  };
  
  // console.log('este es el page: ', page);
  
  // if (page >= 1 && page <= this.totalPages) {
  //   this._currentPage = page;
  //   this.currentPage$.next(this._currentPage);
  // };


  setItemsPerPage(itemsPerPage: number) {
    
    this._itemsPerPage = itemsPerPage;
    this.itemsPerPage$.next(itemsPerPage);
  };

  setTotalItems(totalItems: number) {
    this._totalItems = totalItems;
    this.totalItems$.next(totalItems);
  }
}
