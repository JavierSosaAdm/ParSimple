
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../Services/product.service';
import { Router } from '@angular/router';
import { FireService } from '../../../../Services/fire.service';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductComponent implements OnInit {
  data!: FormGroup;
  private _ProductService = inject(ProductService);
  private _router = inject(Router);

  constructor(private FormBuilder: FormBuilder, private fireService: FireService) {
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
      image: [, []]
    });
  }

  register(event: Event) {
    event.preventDefault();

    if (this.data.invalid) {
      return;
    }

    const dataForm = this.data.value;

    if (dataForm.image) {
      const uploadObservable = this.fireService.upImageProd(dataForm.image);

      uploadObservable.pipe(
        tap(downloadURL => console.log('Progreso de carga:', downloadURL)),
        finalize(() => {
          // Manejo de la URL de descarga después de la subida
          uploadObservable.subscribe({
            next: (downloadURL: string) => {
              dataForm.image = downloadURL;
              this._ProductService.postProduct(dataForm).subscribe({
                next: (response) => {
                  console.log('Producto registrado exitosamente!', response);
                },
                error: (error) => {
                  console.error('Error al registrar el producto:', error);
                }
              });
            },
            error: (error) => {
              console.error('Error al subir la imagen:', error);
            }
          });
        })
      ).subscribe();
    } else {
      this._ProductService.postProduct(dataForm).subscribe({
        next: (response) => {
          console.log('Producto registrado exitosamente!', response);
        },
        error: (error) => {
          console.error('Error al registrar el producto:', error);
        }
      });
    }
    this.data.reset();
  }

  ngOnInit(): void {
    console.log('esto es el formulario de creacion de prodctos');
  }

  hasErrors(field: string, typeError: string) {
    return this.data.get(field)?.hasError(typeError) && this.data.get(field)?.touched;
  }
}
