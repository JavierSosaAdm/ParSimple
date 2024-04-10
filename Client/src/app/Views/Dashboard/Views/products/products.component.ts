import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Services/product.service';
import { CommonModule, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductComponent implements OnInit {
  data!: FormGroup;

  constructor(private FormBuilder: FormBuilder){
    this.data = this.FormBuilder.group({
      id_product: [],
      name: [],
      price: [],
      size: [],
      description: [],
      rating: [],
      reviewsCount: [],
      category: [],
      type: [],
      stock_quantity: [],
      is_Delete: [],
      image: []
    })
  }

  registrar(event: Event){
    event.preventDefault();
    console.log(this.data.value);
    
  }
  ngOnInit(): void {
    console.log('esto es el formulario de creacion de prodctos');
  }

  hasErrors(field: string, typeError: string){
    return this.data.get(field)?.hasError(typeError) && this.data.get(field)?.touched;
  }
}
