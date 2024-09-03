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
  private _fireService = inject(FireService);
  
  
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
      image: ['', []]
    });
  }

  selectedFile: File | null = null;
  register(event: Event) {
    event.preventDefault();
    if (this.data.invalid) {
      return;
    }

    const dataForm = this.data.value;

    if (this.selectedFile) {
      const uploadObservable = this.fireService.upImageProd(this.selectedFile);

      uploadObservable.pipe(
        tap(downloadURL => console.log('Progreso de carga:', downloadURL)),
        finalize(() => {
              // Manejo de la URL de descarga después de la subida
              uploadObservable.subscribe({
                next: (downloadURL: string) => {
                dataForm.image = downloadURL;
                console.log(dataForm.image);
            
                this._fireService.postProductFire(dataForm).subscribe({
                  next: (response) => {
                    console.log('Producto registrado exitosamente!', dataForm);
                    
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
      
      this._fireService.postProductFire(dataForm).subscribe({
        next: () => console.log('Producto registrado exitosamente!'),
        error: (error) => console.error('Error al registrar el producto:', error)
      });
    }
    this.data.reset();
  }

  ngOnInit(): void {
    
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile); // Debería mostrar el archivo seleccionado
    }
    }
  hasErrors(field: string, typeError: string) {
    return this.data.get(field)?.hasError(typeError) && this.data.get(field)?.touched;
  }
}
