import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() product?: { id: string; data: Product };;
  loading: boolean = true;

  private _fireService = inject(FireService)
  private _router = inject(Router);
  private _ProductService = inject(ProductService)
  public sanitizer = inject(DomSanitizer);
  menuSelected: string = '';

  
  verDetail(): void {
    if (this.product && this.product.id) {
      const productId = this.product.id;
      // console.log(productId);
      this._router.navigate(['/products',productId]) // hacer el get product by id 
    
    } else {
      console.error('Producto inválido o ID faltante');
    }
  }
  ngOnInit(): void { 
  }
}
