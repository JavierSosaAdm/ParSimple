import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';


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
  
  register(event: Event) {
    event.preventDefault();
    console.log(this.data.value);
    this._UserService.postUser(this.data.value).subscribe()
  }
  ngOnInit(): void {
    console.log('esto es el formulario de registro de usuarios');
  }

  hasErrors(field: string, typeError: string) {
    return this.data.get(field)?.hasError(typeError) && this.data.get(field)?.touched;
  }
}
