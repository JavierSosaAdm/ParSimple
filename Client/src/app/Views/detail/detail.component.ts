import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit  {
  loading: boolean = true;
  public product?: Product;
  private _route = inject(ActivatedRoute);
  private _ProductService = inject(ProductService)
  
  
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._ProductService.getProductsById(params['id']).subscribe((data: Product) => {
        console.log(data);
        this.product = data;
        this.loading = false;
        
      })
    })
  }
}
