import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { FireService } from '../../Services/fire.service';
import { finalize, tap } from 'rxjs/operators';
@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
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
      uid: [''], // 
      address: [''], //
      password: ['', [Validators.minLength(8)]], //
      phone: [''], //
      image: [''], //
    })
  }
 
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
  hasErrors(field: string, typeError: string) {
    return this.data.get(field)?.hasError(typeError) && this.data.get(field)?.touched;
  }

    isOpen = false;
  
    openModal() {
      this.isOpen = true;
    }
  
    closeModal() {
      this.isOpen = false;
    }
  
}
