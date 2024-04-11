import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductComponent implements OnInit {
  data!: FormGroup;
  private _ProductService = inject(ProductService);
  private _router = inject(Router);

  constructor(private FormBuilder: FormBuilder){
    this.data = this.FormBuilder.group({
      // id_product: ['', []],
      name: ['', [Validators.required]],
      price: [, [Validators.required]],
      size: ['', [Validators.required]],
      description: ['', []],
      rating: [, []],
      reviewsCount: [, []],
      category: ['', [Validators.required]],
      type: ['', [Validators.required]],
      stock_quantity: [, []],
      is_Delete: [, []],
      image: ['', []]
    })
  }

  registrar(event: Event){
    event.preventDefault();
    console.log(this.data.value);
    this._ProductService.postProduct(this.data.value).subscribe();
  }
  ngOnInit(): void {
    console.log('esto es el formulario de creacion de prodctos');
  }

  hasErrors(field: string, typeError: string){
    return this.data.get(field)?.hasError(typeError) && this.data.get(field)?.touched;
  }
}
