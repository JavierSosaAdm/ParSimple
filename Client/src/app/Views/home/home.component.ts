import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../product/product.component';
import { CardsComponent } from '../../Components/cards/cards.component';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../models/product.model';
import { Router } from 'express';
import { SearchComponent } from '../../Components/search/search.component';
import { FireService } from '../../Services/fire.service';
import { FiltersComponent } from '../../Components/filters/filters.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductsComponent, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // ProductList: { id: string, data: Product}[] = [];
  // searchName: string = '';
  
  
  // private _fireService = inject(FireService)
  // private _ProductService = inject(ProductService);
  // private _router = inject(Router);
  ngOnInit(): void {
    // this._fireService.getProductsFire().subscribe((data) => {
    //   this.ProductList = data
    //   console.log('este es el produclist de home' ,this.ProductList);  
    // })
  }
}
