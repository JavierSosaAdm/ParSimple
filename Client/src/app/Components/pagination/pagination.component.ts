import { Component, inject, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '../../models/product.model';
import { FireService } from '../../Services/fire.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  ProductList: { id: string, data: Product }[] = [];
  
  totalItems: number = this.ProductList.length;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  private _fireService = inject(FireService)
ngOnInit(): void {
  this._fireService.getProductsFire().subscribe((data) => {
    this.ProductList = data
    console.log('lista de productos en el paginado: ', this.ProductList);
    
  })
}
  
}
