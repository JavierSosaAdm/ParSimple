import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isOpen: boolean = false;
  openModal() {
    console.log('esto es isOpen: ', this.isOpen);
    this.isOpen = true;
    console.log('esto es isOpen despues de open model: ', this.isOpen);
  }

  closeModal() {
    console.log('esto es isOpen: ', this.isOpen);
    this.isOpen = false;
    console.log('esto es isOpen despues de open model: ', this.isOpen);
  }
}
