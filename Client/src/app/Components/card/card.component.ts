import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  private _router = inject(Router);
  private _ProductService = inject(ProductService)
  menuSelected: string = '';

  
  verDetail(): void {
    if (this.product && this.product.id_product) {
      const idProduct = this.product.id_product;
      this._router.navigate(['/products', idProduct])
    } else {
      console.error('Producto inválido o ID faltante');
    }
  }
  ngOnInit(): void { 
  }
}
