import { Component, Input, OnInit, inject } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { FireService } from '../../Services/fire.service';
import { finalize, tap } from 'rxjs/operators';
import { FormModalComponent } from '../../Components/form-modal/form-modal.component';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule, FormModalComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  
  data!: FormGroup;
  uid: string = '';
  userList: { data: User, id: string }[] = [];
  filter: { data: User, id: string }[] = [];
  
  isOpen = false;
  private _fireService = inject(FireService);
  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  private authService = inject(AngularFireAuth);
  private modal = FormModalComponent
  public users: {data: User}[] = [];
  private currentEmail: string | null | undefined = '';
  selectedFile: File | null = null;

  constructor(private FormBuilder: FormBuilder) {
    this.data = this.FormBuilder.group({
      uid: [''], // //
      address: [''], //
      password: ['', [Validators.minLength(8)]], //
      phone: [''], //
      image: [''], //
    })
  }
  
  listaDeUsuarios() {
    this._userService.getUsers().subscribe(async (users) => {
      this.userList = users;
      this._authService.getCurrentUser().subscribe((user) => {
        this.currentEmail = user?.email
        this.userList = this.userList.filter(user => user.data.email === this.currentEmail)
        console.log('email dentro de usuarios: ', this.currentEmail);
      })
      console.log('esto es lista de user: ', this.userList);
    })
  };
  
    openModal() {
      console.log('esto es isOpen: ', this.isOpen);
      this.isOpen = true;
      console.log('esto es isOpen despues de open model: ', this.isOpen);
    }
  
    closeModal() {
      this.isOpen = false;
    }
  
  
  ngOnInit(): void {
    this.listaDeUsuarios();
  }
}



