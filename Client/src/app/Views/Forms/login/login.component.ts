import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthComponent } from '../../../auth/auth.component';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule, AuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  firebaseService = inject(AuthService);
  private _router = inject(Router);
  loginForm!: FormGroup;

  constructor(private FormBuilder: FormBuilder) {
    this.loginForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  async enviar(event: Event){
    if(this.loginForm.valid) {
      event.preventDefault();
      this.firebaseService.singIn(this.loginForm.value as User)
      .then(resp => {
        console.log('___', resp.user.email);
        this._router.navigate(['/']); // redirección a home page
      })
      .catch(error => {
        console.error(error);
      })
    }
    console.log(this.loginForm.value);

  }
  ngOnInit(): void {
    
  }

  hasErrors(field: string, typeError: string) {
    return this.loginForm.get(field)?.hasError(typeError) && this.loginForm.get(field)?.touched;
  }
}
