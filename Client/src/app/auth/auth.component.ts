import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  firebaseService = inject(AuthService);
  authForm!: FormGroup;
  public login = this.authForm

  
  constructor(private FormBuilder: FormBuilder) {
    this.authForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


  ngOnInit(): void {
    
  }

  async submit() {
    if(this.authForm.valid) {
      this.firebaseService.singIn(this.authForm.value as User)
      .then(resp => {
        console.log('___', resp);
        
      })
    }
  }
}
