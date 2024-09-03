import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class PaginateService {
  private _productListSource = new BehaviorSubject<{ id: string, data: Product }[]>([]);
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

  getPaginatedData (): Observable<{ id: string, data: Product }[]> {
    return combineLatest([this.currentPage$, this.itemsPerPage$, this.ProductList])
      .pipe(
        map(([currentPage, itemsPerPage, ProductList]) => {
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          return this.ProductList.slice(startIndex, endIndex);
        })
      );
  };
 
  previousPage() {
    if (this._currentPage > 1) {
      this.setCurrentPage(this._currentPage - 1);
    }
  };

  nextPage() {
    if (this._currentPage < this.totalPages) {
      this.setCurrentPage(this._currentPage + 1) 
    }
  };

  setCurrentPage(page: number) {
    this._currentPage = page;
    this.currentPage$.next(this._currentPage);
  };
  
  setItemsPerPage(itemsPerPage: number) {
    this._itemsPerPage = itemsPerPage;
    this.itemsPerPage$.next(itemsPerPage);
  };
    
  setTotalItems(totalItems: number, ProductList: any) {
    this._totalItems = totalItems;
    this.totalItems$.next(totalItems);
    this.ProductList = ProductList;  
  };
}
