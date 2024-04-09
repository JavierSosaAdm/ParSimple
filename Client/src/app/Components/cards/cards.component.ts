import { Component, Input, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  @Input() product?: Product[];
  loading: boolean = true;
  // public product?: Product;
  private _route = inject(ActivatedRoute);
  private _ProductService = inject(ProductService)

  
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._ProductService.getProducts().subscribe((data: Product[]) => {
        console.log(data);
        this.product = data;
        this.loading = false;
        
      })
    })
  }
}
