import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  userList: { data: User, id: string }[] = [];
  filter: { data: User, id: string }[] = [];

  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  private authService = inject(AngularFireAuth)
  public users: {data: User}[] = [];
  private currentEmail: string | null | undefined = '';
  
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

  updateProfile() {
    this._userService.updateUser('id')
  }
  ngOnInit(): void {
    this.listaDeUsuarios();
  }
}



