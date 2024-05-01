import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent implements OnInit {
  data!: FormGroup;
  private _UserService = inject(UserService);
  private _auth = inject(AuthService);
  private _router = inject(Router);

  constructor(private FormBuilder: FormBuilder) {
    this.data = this.FormBuilder.group({
      uid: ['', [Validators.required]], // //
      name: ['', [Validators.required]], // //
      lastName: ['', [Validators.required]], // //
      address: [''], //
      email: ['', [Validators.required, Validators.email]], //
      password: ['', [Validators.required, Validators.minLength(8)]], //
      phone: ['', [Validators.required]], //
      image: [''], //
      is_Admin: [],
      is_Delete: [],
      isBlocked: [],
      payment_code: []
    })
  }
  
  async register(event: Event) {
    event.preventDefault();
    const { email, password } = this.data.value;
    
    try {
      const userCredential = await this._auth.createUserWithEmailAndPassword(email, password);
      console.log('Usuario creado exitosamente:', userCredential);
      this._UserService.postUserFire(this.data.value).subscribe()
      
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
    console.log(this.data.value);
    this._router.navigate(['/']); // redirección a home page
  }
  ngOnInit(): void {
    console.log('esto es el formulario de registro de usuarios');
  }

  hasErrors(field: string, typeError: string) {
    return this.data.get(field)?.hasError(typeError) && this.data.get(field)?.touched;
  }
}
