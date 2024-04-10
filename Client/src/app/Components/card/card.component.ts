import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() product?: Product;
  loading: boolean = true;
  // public product?: Product;
  private _route = inject(ActivatedRoute);
  private _ProductService = inject(ProductService)

  
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._ProductService.getProductsById(params['id_product']).subscribe((data: Product) => {
        console.log(data);
        this.product = data;
        this.loading = false;
        
      })
    })
  }
}
