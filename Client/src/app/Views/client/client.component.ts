import { Component, OnInit, inject } from '@angular/core';
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

  private _fireService = inject(FireService);
  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  private authService = inject(AngularFireAuth)
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

  updateProfile() {
    const userData: User = this.data.value;
    if (this.selectedFile) {
      const uploadObservable = this._fireService.upImageProd(this.selectedFile);

      uploadObservable.pipe(
        tap(downloadURL => console.log('Progreso de carga:', downloadURL)),
        finalize(() => {
              // Manejo de la URL de descarga después de la subida
              uploadObservable.subscribe({
                next: (downloadURL: string) => {
                userData.image = downloadURL;
                console.log(userData.image);
            
                this._userService.updateUser(this.currentEmail, userData).subscribe({
                  next: (response) => {
                    console.log('Perfil editado exitosamente!', userData);
                    
                  },
                  error: (error) => {
                    console.error('Error al editar perfil:', error);
                  }
                });
              },
              error: (error) => {
                console.error('Error al subir la imagen:', error); 
              }
            });
        })
      ).subscribe();
    }
    this.data.reset();
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile); // Debería mostrar el archivo seleccionado
    }
    }
  
    isOpen = false;
  
    openModal() {
      this.isOpen = true;
    }
  
    closeModal() {
      this.isOpen = false;
    }
  
  
  ngOnInit(): void {
    this.listaDeUsuarios();
  }
}



