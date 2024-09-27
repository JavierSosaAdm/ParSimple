import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
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
export class FormModalComponent implements OnInit, OnDestroy {
  @Input() isModalOpen: boolean = false;
  
  dataAddress!: FormGroup;
  dataImage!: FormGroup;
  dataPassword!: FormGroup;
  dataPhone!: FormGroup;
 
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

  constructor(private formBuilder: FormBuilder) {
    this.dataAddress = this.formBuilder.group({
      address: [''], // 
    })
    this.dataImage = this.formBuilder.group({
      image: [''], // 
    })
    this.dataPassword = this.formBuilder.group({
      password: [''], // 
    })
    this.dataPhone = this.formBuilder.group({
      phone: [''], // 
    })
    
  }
  updatePhone(): void{
    const userDataPhone: User = this.dataPhone.value;
    console.log('email 1 en phone: ', this.currentEmail);
    this._userService.updateUser(this.currentEmail, userDataPhone).subscribe({
      next: (response) => {

        console.log('Perfil editado exitosamente!', userDataPhone);
                    
      },
      error: (error) => {
        console.error('Error al editar perfil:', error);
      }
    });  
  };
  updateAddress(): void{
    const userDataAddress: User = this.dataAddress.value;
    console.log('email 1 en address: ', this.currentEmail);
    this._userService.updateUser(this.currentEmail, userDataAddress).subscribe({
      next: (response) => {

        console.log('Perfil editado exitosamente!', userDataAddress);
                    
      },
      error: (error) => {
        console.error('Error al editar perfil:', error);
      }
    });
  };
  updatePassword(): void{
    const userDataPassword: User = this.dataPassword.value;
    console.log('email 1 en password: ', this.currentEmail);
    this._userService.updateUser(this.currentEmail, userDataPassword).subscribe({
      next: (response) => {

        console.log('Perfil editado exitosamente!', userDataPassword);
                    
      },
      error: (error) => {
        console.error('Error al editar perfil:', error);
      }
    });
  };
  updateImage(): void {
    const userDataImage: User = this.dataImage.value;
    console.log('esto es userData: ', userDataImage);
    console.log('email 1: ', this.currentEmail);
    if (this.selectedFile) {
      const uploadObservable = this._fireService.upImageProd(this.selectedFile);
      
      uploadObservable.pipe(
        tap(downloadURL => console.log('Progreso de carga:', downloadURL)),
        finalize(() => {
              // Manejo de la URL de descarga después de la subida
              uploadObservable.subscribe({
                next: (downloadURL: string) => {
                userDataImage.image = downloadURL;
                console.log(userDataImage.image);
                console.log('email 2: ', this.currentEmail);
                
                this._userService.updateUser(this.currentEmail, userDataImage).subscribe({
                  next: (response) => {

                    console.log('Perfil editado exitosamente!', userDataImage);
                    
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
    this.dataImage.reset();
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile); // Debería mostrar el archivo seleccionado
    }
    }
  hasErrors(field: string, typeError: string) {
    return this.dataPassword.get(field)?.hasError(typeError) && this.dataPassword.get(field)?.touched;
  }

    isOpen = false;
  
    openModal() {
      this.isOpen = true;
      console.log('isOpen: ', this.isOpen);
    }
  
    closeModal() {
      this.isOpen = false;
      console.log('este cerrar suena');
      
    }
  ngOnInit(): void {
    this._authService.getCurrentUser().subscribe(user => {
      this.currentEmail = user?.email;
    })
  }
  ngOnDestroy(): void {
    this.closeModal() 
  }
}
