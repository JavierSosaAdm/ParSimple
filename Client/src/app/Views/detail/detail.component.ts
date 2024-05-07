import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FireService } from '../../Services/fire.service';
import { catchError } from 'rxjs';
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
  private _FireService = inject(FireService)

  
  ngOnInit(): void {
   
    this._route.params.subscribe(params => {
      this._FireService.getProductByIdFire(params['id'])
        .pipe(
          catchError(error => {
            // Maneja el error con gracia, p.ej., muestra un mensaje de error
            console.error('Error al obtener el producto:', error);
            this.loading = false; // Establece cargando en falso incluso en caso de error
            return []; // Observable vacío para prevenir más errores
          })
        )
        .subscribe((data: Product | undefined) => {
          this.product = data;
          this.loading = false;
        });
    });
  }
    
  }

